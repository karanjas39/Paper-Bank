import { Context } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import generateOTP from "../utils/generateOTP";
import sendMail from "../utils/sendMail";
import { z_verifyOTP } from "@singhjaskaran/paperbank-common";

export async function sendOTP(c: Context) {
  try {
    const userId: string = c.get("id");
    const verified: boolean = c.get("verified");

    if (verified) throw new Error("You have already verified your email.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUser = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!isUser) throw new Error("No such user is registered with us.");

    const otp = generateOTP();
    const text = `Your OTP is ${otp}`;

    const isMailSent = await sendMail(
      text,
      isUser.email,
      "Verify your email",
      c.env.RESEND_KEY
    );

    if (!isMailSent) throw new Error("Failed to send email.");

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        otp: otp,
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "OTP is sent successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to send otp.",
    });
  }
}

export async function verifyOTP(c: Context) {
  try {
    const userId: string = c.get("id");
    const verified: boolean = c.get("verified");

    if (verified) throw new Error("You have already verified your email.");

    const body = await c.req.json();

    const { success, data } = z_verifyOTP.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const isUser = await prisma.user.findUnique({
      where: {
        id: Number(userId),
      },
    });

    if (!isUser) throw new Error("No such user is registered with us.");

    if (isUser.otp !== data.otp) throw new Error("Your otp is not correct.");

    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        verified: true,
        otp: "",
      },
    });

    return c.json({
      success: true,
      status: 200,
      message: "Your email is verified successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to verify otp.",
    });
  }
}
