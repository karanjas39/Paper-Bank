import { Hono } from "hono";
import { contactAdmin } from "../controllers/contact";

const contact = new Hono<{
  Bindings: {
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_CHAT_ID: string;
  };
}>();

contact.post("/admin", contactAdmin);

export default contact;
