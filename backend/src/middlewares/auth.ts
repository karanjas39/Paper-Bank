import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function isauthorized(c: Context, next: Next) {
  try {
    const jwt = c.req.header("Authorization");

    if (!jwt) throw new Error("User is unauthorized.");

    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) throw new Error("User is unauthorized.");

    if (!payload.verified) throw new Error("User is not verified.");

    c.set("id", payload.id);
    c.set("admin", payload.admin);
    c.set("verified", payload.verified);

    await next();
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to verify the token.",
    });
  }
}
