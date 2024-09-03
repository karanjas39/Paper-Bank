import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z_signin, z_signup } from "@singhjaskaran/paperbank-common";
import { compareSync, hashSync } from "bcrypt-ts";
import { sign } from "hono/jwt";

export async function signup(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_signup.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const hashedPassword = hashSync(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        programId: data.programId,
      },
    });

    if (!newUser) throw new Error("Failed to register new user.");

    return c.json({
      success: true,
      status: 200,
      message: "New user is registered successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to register new user.",
    });
  }
}

export async function signin(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_signin.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUserExist = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
      select: {
        id: true,
        password: true,
        admin: true,
        verified: true,
      },
    });

    if (!isUserExist) throw new Error("Password or email is incorrect.");

    const isPasswordCorrect = compareSync(data.password, isUserExist.password);

    if (!isPasswordCorrect) throw new Error("Password or email is incorrect.");

    const token = await sign(
      {
        userId: isUserExist.id,
        admin: isUserExist.admin,
        verified: isUserExist.verified,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      success: true,
      status: 200,
      message: "You have been logged in successfully.",
      token,
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to log in right now.",
    });
  }
}
