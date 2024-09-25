import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function allNotifications(c: Context) {
  try {
    const id: string = c.get("id");

    if (!id) throw new Error("User id is required.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const notifications = await prisma.notification.findMany({
      where: {
        userId: Number(id),
      },
      select: {
        message: true,
        createdAt: true,
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return c.json({
      success: true,
      status: 200,
      notifications,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to get all notifications.",
    });
  }
}

export async function deleteAllNotifications(c: Context) {
  try {
    const id: string = c.get("id");

    if (!id) throw new Error("User id is required.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.notification.deleteMany({
      where: {
        userId: Number(id),
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "All notifications are cleared successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to clear all notifications.",
    });
  }
}
