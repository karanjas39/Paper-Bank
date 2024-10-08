import { Context } from "hono";
import { z_createMessage } from "@singhjaskaran/paperbank-common";
import { sendMessage } from "../utils/sendMessage";

export async function contactAdmin(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_createMessage.safeParse(body);

    if (!success) {
      throw new Error("Invalid inputs are passed.");
    }

    const responses = await sendMessage(
      `<strong>New Contact</strong>\n${data.message}`,
      c.env.TELEGRAM_BOT_TOKEN,
      c.env.TELEGRAM_CHAT_IDS
    );

    const allSuccessful = responses.every((response) => response.ok);

    if (!allSuccessful) {
      throw new Error("Failed to send message to one or more recipients.");
    }

    return c.json({
      success: true,
      status: 200,
      message: "Message is sent to admin(s) successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to send message.",
    });
  }
}
