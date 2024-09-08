import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import uploadData from "../utils/uploadData";
import {
  z_createQuestionPaper,
  z_reviewQP,
} from "@singhjaskaran/paperbank-common";

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

export async function reviewQP(c: Context) {
  try {
    const adminId = c.get("id");

    const body = await c.req.json();
    const { success, data } = z_reviewQP.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const kv = c.env["my-app"];

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isQP = await prisma.questionPaper.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!isQP) throw new Error("No such question paper exist.");

    if (isQP.status === "approved")
      throw new Error("This question paper is aleady reviewed.");

    if (data.status === "approved") {
      await prisma.questionPaper.update({
        where: {
          id: isQP.id,
        },
        data: {
          status: data.status,
          reviewerId: Number(adminId),
        },
      });

      await prisma.user.update({
        where: {
          id: isQP.userId,
        },
        data: {
          uploadCount: 0,
        },
      });
    } else if (data.status === "rejected") {
      await kv.delete(isQP.fileKey);
      await prisma.questionPaper.delete({
        where: {
          id: data.id,
        },
      });
    }

    await prisma.notification.create({
      data: {
        userId: isQP.userId,
        message: `The ${
          isQP.courseName
        } question paper you have uploaded is being ${data.status}. ${
          data.status === "approved"
            ? "Now you can contribute one more question paper."
            : ""
        }`,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "The qp review is done successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 404,
      message: err.message || "Failed to review the Question Paper.",
    });
  }
}

export async function getAllApprovedQP(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const qps = await prisma.questionPaper.findMany({
      where: {
        status: "approved",
      },
      select: {
        courseCode: true,
        courseName: true,
        examType: true,
        year: true,
        id: true,
        fileKey: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      status: 200,
      qps,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 404,
      message: err.message || "Failed to get all Question Paper.",
    });
  }
}

export async function getAllPendingQP(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const qps = await prisma.questionPaper.findMany({
      where: {
        status: "pending",
      },
      select: {
        courseCode: true,
        courseName: true,
        examType: true,
        year: true,
        id: true,
        fileKey: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    return c.json({
      success: true,
      status: 200,
      qps,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 404,
      message: err.message || "Failed to get all Question Paper.",
    });
  }
}