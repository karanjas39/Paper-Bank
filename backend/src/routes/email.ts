import { Hono } from "hono";
import { sendOTP, verifyOTP } from "../controllers/email";
import { isauthorized } from "../middlewares/auth";

const email = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    RESEND_KEY: string;
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

email.use("*", isauthorized);

email.get("/otp", sendOTP);
email.post("/verify-otp", verifyOTP);

export default email;
