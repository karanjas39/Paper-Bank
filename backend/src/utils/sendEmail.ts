export default async function sendMail(
  text: string,
  to: string,
  subject: string,
  api_key: string,
  app_email: string,
  app_password: string
) {
  try {
    const response = await fetch("https://muxmail.vercel.app/api/mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": api_key,
      },
      body: JSON.stringify({
        to: to,
        app: "Paper Bank",
        subject: subject,
        text: text,
        credentials: {
          email: app_email,
          password: app_password,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
