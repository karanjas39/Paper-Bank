import { Resend } from "resend";
import { WebsiteName } from "./constants";

export default async function sendMail(
  text: string,
  to: string,
  subject: string,
  api_key: string
) {
  try {
    const resend = new Resend(api_key);

    const data = await resend.emails.send({
      from: `${WebsiteName} <onboarding@resend.dev>`,
      to: [to],
      subject: subject,
      text: text,
    });
    if (data.error) throw new Error();

    return true;
  } catch (error) {
    return false;
  }
}
