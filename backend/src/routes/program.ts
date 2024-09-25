import { Hono } from "hono";
import {
  createProgram,
  editProgram,
  getAllProgram,
} from "../controllers/program";
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
program.patch("/update", isauthorized, isVerified, isAdmin, editProgram);
program.get("/all", getAllProgram);

export default program;
