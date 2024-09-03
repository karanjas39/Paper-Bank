import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import uploadData from "../utils/uploadData";
import {
  z_createQuestionPaper,
  z_signin,
} from "@singhjaskaran/paperbank-common";

export async function uploadQP(c: Context) {
  try {
    const userId = c.get("id");

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

    if (error || !key) throw new Error("");

    const kv = c.env["my-app"];
    await kv.put(key, data);

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const newUpload = await prisma.questionPaper.create({
      data: {
        courseCode: parsedData.courseCode,
        courseName: parsedData.courseName,
        examType: parsedData.examType,
        fileKey: key,
        year: parsedData.year,
        userId: Number(userId),
        reviewerId: 1,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Ouestion paper is uploaded successfully.",
      key,
      parsedData,
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
