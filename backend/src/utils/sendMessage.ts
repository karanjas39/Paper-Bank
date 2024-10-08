export async function sendMessage(
  message: string,
  BotId: string,
  userIds: string[]
) {
  const telegramApiUrl = `https://api.telegram.org/bot${BotId}/sendMessage`;

  const responses = await Promise.all(
    userIds.map(async (userId) => {
      const response = await fetch(telegramApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: userId,
          text: message,
          parse_mode: "HTML",
        }),
      });

      return response;
    })
  );
  return responses;
}
