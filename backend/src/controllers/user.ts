import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import uploadData from "../utils/uploadData";
import { z_createQuestionPaper } from "@singhjaskaran/paperbank-common";

export async function uploadQP(c: Context) {
  try {
    const userId = c.get("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUser = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!isUser) throw new Error("No such user is regsitered with us.");

    if (isUser.uploadCount !== 0 && !isUser.admin)
      throw new Error("You have exhausted your upload quota.");

    const file = await c.req.formData();
    if (!file) throw new Error("No file is uploaded.");

    const formData = await c.req.formData();
    if (!formData) throw new Error("No form data received.");

    const pdf = formData.get("file");
    const courseName = formData.get("courseName")?.toString();
    const courseCode = formData.get("courseCode")?.toString();
    const year = formData.get("year")?.toString();
    const examType = formData.get("examType")?.toString();
    const { success, data: parsedData } = z_createQuestionPaper.safeParse({
      courseName,
      courseCode,
      year,
      examType,
      pdf,
    });

    if (!success) throw new Error("Invalid inputs are passed.");

    if (!pdf || typeof pdf === "string") throw new Error("Invalid file upload");

    const { data, error, key } = await uploadData(pdf, Number(userId));

    if (error) throw new Error(error);
    if (!key) throw new Error("Failed to create kv key.");

    const kv = c.env["my-app"];
    await kv.put(key, data);

    const newUpload = await prisma.questionPaper.create({
      data: {
        courseCode: parsedData.courseCode,
        courseName: parsedData.courseName,
        examType: parsedData.examType,
        fileKey: key,
        year: parsedData.year,
        userId: isUser.id,
      },
    });

    if (!newUpload) throw new Error("Failed to create question paper.");

    await prisma.user.update({
      where: {
        id: isUser.id,
      },
      data: {
        uploadCount: isUser.uploadCount + 1,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Ouestion paper is uploaded successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to upload Question paper.",
    });
  }
}

export async function getQP(c: Context) {
  try {
    const key = c.req.param("key");
    if (!key) throw new Error("No key provided.");

    const kv = c.env["my-app"];
    const base64Data = await kv.get(key);
    if (!base64Data) throw new Error("Question Paper not found.");

    const bytes = new Uint8Array(base64Data.split(",").map(Number));
    const arrayBuffer = bytes.buffer;

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${key}.pdf"`,
      },
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 404,
      message: err.message || "Failed to retrieve the Question Paper.",
    });
  }
}
