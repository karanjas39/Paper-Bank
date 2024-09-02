import { Hono } from "hono";
import { signin, signup } from "../controllers/auth";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SALT: number;
  };
}>();

auth.post("/signup", signup);
auth.post("/signin", signin);

export default auth;
