import { Hono } from "hono";
import { getQP, uploadQP } from "../controllers/questionPaper";
import { isauthorized, isVerified } from "../middlewares/auth";

const qp = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

qp.post("/upload", isauthorized, isVerified, uploadQP);
qp.get("/:key", getQP);
qp.delete("/:key", getQP);

export default qp;
