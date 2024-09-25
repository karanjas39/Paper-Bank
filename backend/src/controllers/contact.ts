import { Context } from "hono";
import { z_createMessage } from "@singhjaskaran/paperbank-common";

export async function contactAdmin(c: Context) {
  try {
    const body = await c.req.json();

    const { success, data } = z_createMessage.safeParse(body);

    if (!success) throw new Error("Invalid inputs are passed.");

    const telegramApiUrl = `https://api.telegram.org/bot${c.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

    const response = await fetch(telegramApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: c.env.TELEGRAM_CHAT_ID,
        text: data.message,
      }),
    });

    if (!response.ok) throw new Error("Failed to send message.");

    return c.json({
      success: true,
      status: 200,
      message: "Message is sent to admin successfully.",
    });
  } catch (error) {
    const err = error as Error;
    return c.json({
      success: false,
      status: 400,
      message: err.message || "Failed to send messsage.",
    });
  }
}
