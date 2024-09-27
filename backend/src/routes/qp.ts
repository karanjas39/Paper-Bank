import { Hono } from "hono";
import {
  deleteQP,
  getAllApprovedQP,
  getAllQPs,
  getAllUserQP,
  getQP,
  reviewQP,
  updateQP,
  uploadQP,
} from "../controllers/questionPaper";
import { isAdmin, isauthorized, isVerified } from "../middlewares/auth";

const qp = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    TELEGRAM_BOT_TOKEN: string;
    TELEGRAM_CHAT_IDS: string[];
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

qp.post("/upload", isauthorized, isVerified, uploadQP);
qp.delete("/delete", isauthorized, isVerified, isAdmin, deleteQP);
qp.patch("/update", isauthorized, isVerified, isAdmin, updateQP);
qp.get("/pdf/:key", getQP);
qp.post("/review", isauthorized, isVerified, isAdmin, reviewQP);
qp.get("/approved", getAllApprovedQP);
qp.get("/user", isauthorized, isVerified, getAllUserQP);
qp.get("/all", isauthorized, isVerified, isAdmin, getAllQPs);

export default qp;
