import { Hono } from "hono";
import { signup } from "../controllers/auth";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SALT: number;
  };
}>();

auth.post("/signup", signup);

export default auth;
