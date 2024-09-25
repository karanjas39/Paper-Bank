import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_createProgram,
  z_editProgram,
} from "@singhjaskaran/paperbank-common";

export async function createProgram(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_createProgram.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const new_program = await prisma.program.create({
      data: {
        name: data.name,
      },
    });

    if (!new_program) throw new Error("Failed to create new program.");

    return c.json({
      success: true,
      status: 200,
      message: "New program is created successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to create new program.",
    });
  }
}

export async function editProgram(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_editProgram.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.program.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Program is updated successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to update program.",
    });
  }
}

export async function getAllProgram(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const programs = await prisma.program.findMany({
      select: {
        name: true,
        id: true,
        createdAt: true,
      },
    });

    return c.json({
      success: true,
      status: 200,
      programs,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to get programs.",
    });
  }
}
