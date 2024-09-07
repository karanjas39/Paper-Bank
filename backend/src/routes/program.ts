import { Hono } from "hono";
import { createProgram, getAllProgram } from "../controllers/program";
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

program.post("/create", isauthorized, isVerified, isAdmin, createProgram);
program.get("/all", getAllProgram);

export default program;
