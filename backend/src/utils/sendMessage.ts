export async function sendMessage(
  message: string,
  BotId: string,
  userId: string
) {
  const telegramApiUrl = `https://api.telegram.org/bot${BotId}/sendMessage`;

  const response = await fetch(telegramApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: userId,
      text: message,
    }),
  });

  return response;
}
