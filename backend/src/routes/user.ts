import { Hono } from "hono";
import { uploadQP } from "../controllers/user";
import { isauthorized, isVerified } from "../middlewares/auth";

const user = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

user.use("*", isauthorized);

user.post("/upload-qp", isVerified, uploadQP);

export default user;
