import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  z_resetUploads,
  z_updatePassword,
  z_updateUser,
} from "@singhjaskaran/paperbank-common";
import { compareSync, hashSync } from "bcrypt-ts";

export async function allUsers(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const page = parseInt(c.req.query("page") || "1", 10);
    const pageSize = parseInt(c.req.query("pageSize") || "10", 10);
    const searchTerm = c.req.query("search") || "";

    const skip = (page - 1) * pageSize;

    const users = await prisma.user.findMany({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { email: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {},
      skip,
      take: pageSize,
      select: {
        name: true,
        email: true,
        program: {
          select: {
            name: true,
          },
        },
        admin: true,
        createdAt: true,
        updatedAt: true,
        uploadCount: true,
        verified: true,
        id: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalUsers = await prisma.user.count({
      where: searchTerm
        ? {
            OR: [
              { name: { contains: searchTerm, mode: "insensitive" } },
              { email: { contains: searchTerm, mode: "insensitive" } },
            ],
          }
        : {},
    });

    const totalPages = Math.ceil(totalUsers / pageSize);

    return c.json({
      success: true,
      status: 200,
      users,
      pagination: {
        currentPage: page,
        pageSize,
        totalPages,
        totalUsers,
      },
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
        uploadCount: true,
        program: {
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

export async function updateUserDetails(c: Context) {
  try {
    const userId = c.get("id");
    const body = await c.req.json();

    const { success, data } = z_updateUser.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data,
    });

    return c.json({
      success: true,
      status: 200,
      message: "Your details are updated successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to update user details.",
    });
  }
}

export async function resetUploadCount(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_resetUploads.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        uploadCount: 0,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Upload count is reset successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to reset upload count.",
    });
  }
}

export async function updateUserPassword(c: Context) {
  try {
    const userId = c.get("id");
    const body = await c.req.json();

    const { success, data } = z_updatePassword.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: {
        password: true,
      },
    });

    if (!user) throw new Error("No such user is regsitered with us.");

    const isPasswordCorrect = compareSync(data.previousPassword, user.password);

    if (!isPasswordCorrect) throw new Error("Password is incorrect.");

    if (data.confirmNewPassword !== data.newPassword)
      throw new Error("Confirmed password does not match.");

    const hashedPassword = hashSync(data.newPassword, 10);

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        password: hashedPassword,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Your password is changed successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to update user details.",
    });
  }
}
