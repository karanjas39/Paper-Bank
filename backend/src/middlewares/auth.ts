import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export async function isauthorized(c: Context, next: Next) {
  try {
    const jwt = c.req.header("Authorization");

    if (!jwt) throw new Error("You are unauthorized.");

    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);

    if (!payload) throw new Error("You are unauthorized.");

    c.set("id", payload.userId);
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

export async function isVerified(c: Context, next: Next) {
  try {
    const isVerified = c.get("verified") || null;
    if (isVerified === "false" || !isVerified)
      throw new Error("You are not verified.");
    await next();
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "You are not verified.",
    });
  }
}

export async function isAdmin(c: Context, next: Next) {
  try {
    const isAdmin = c.get("admin") || null;
    if (isAdmin === "false" || !isAdmin)
      throw new Error("You are unauthorized.");
    await next();
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "You are unauthorized.",
    });
  }
}
