import { Hono } from "hono";
import {
  getAllApprovedQP,
  getAllQPs,
  getAllUserQP,
  getQP,
  reviewQP,
  uploadQP,
} from "../controllers/questionPaper";
import { isAdmin, isauthorized, isVerified } from "../middlewares/auth";

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
qp.get("/pdf/:key", getQP);
qp.post("/review", isauthorized, isVerified, isAdmin, reviewQP);
qp.get("/approved", getAllApprovedQP);
qp.get("/user", isauthorized, isVerified, getAllUserQP);
qp.get("/all", isauthorized, isVerified, isAdmin, getAllQPs);

export default qp;
