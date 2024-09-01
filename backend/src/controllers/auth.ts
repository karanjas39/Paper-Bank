import { Context } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export async function signup(c: Context) {
  return c.json({ msg: "Signup" });
}
