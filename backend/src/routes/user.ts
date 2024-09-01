import { Hono } from "hono";

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    admin: boolean;
  };
}>();

export default auth;
