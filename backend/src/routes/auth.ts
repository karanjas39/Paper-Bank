import { Hono } from "hono";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    SALT: number;
  };
}>();

export default auth;
