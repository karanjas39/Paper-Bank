import { Hono } from "hono";
import { sendOTP, signin, signup } from "../controllers/auth";
import { isauthorized } from "../middlewares/auth";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SALT: number;
    APP_PASSWORD: string;
    APP_EMAIL: string;
  };
}>();

auth.post("/signup", signup);
auth.post("/signin", signin);
auth.get("/send-otp", isauthorized, sendOTP);

export default auth;
