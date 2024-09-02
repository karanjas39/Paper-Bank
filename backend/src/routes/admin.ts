import { Hono } from "hono";
import { createProgram } from "../controllers/program";

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

admin.post("/create/program", createProgram);

export default admin;
