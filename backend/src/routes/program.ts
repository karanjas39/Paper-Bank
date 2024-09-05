import { Hono } from "hono";
import { createProgram } from "../controllers/program";
import { isAdmin, isauthorized, isVerified } from "../middlewares/auth";

const program = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

program.use("*", isauthorized);

program.post("/create", isVerified, isAdmin, createProgram);

export default program;
