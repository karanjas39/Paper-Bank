import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function allUsers(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const users = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        program: {
          select: {
            name: true,
          },
        },
        admin: true,
        verified: true,
        id: true,
      },
    });

    return c.json({
      success: true,
      status: 200,
      users,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to get users.",
    });
  }
}

export async function userDetails(c: Context) {
  try {
    const userId = c.get("id");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
      select: {
        name: true,
        email: true,
        verified: true,
        admin: true,
        createdAt: true,
        updatedAt: true,
        program: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({
      success: true,
      status: 200,
      user,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to get users.",
    });
  }
}
