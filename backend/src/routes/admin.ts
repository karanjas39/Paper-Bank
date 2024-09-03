import { Hono } from "hono";
import { createProgram } from "../controllers/program";
import { isAdmin, isauthorized, isVerified } from "../middlewares/auth";

const admin = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

admin.use("*", isauthorized, isAdmin);

admin.post("/create/program", isVerified, createProgram);

export default admin;
