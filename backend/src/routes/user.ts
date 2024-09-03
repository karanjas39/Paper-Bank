import { Hono } from "hono";
import { getQP, uploadQP } from "../controllers/user";
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

user.post("/upload-qp", isauthorized, isVerified, uploadQP);
user.get("/qp/:key", getQP);

export default user;
