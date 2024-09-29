import { Hono } from "hono";
import { isAdmin, isauthorized, isVerified } from "../middlewares/auth";
import {
  allUsers,
  resetUploadCount,
  updateUserDetails,
  updateUserPassword,
  userDetails,
} from "../controllers/user";
import { verifyOTP } from "../controllers/auth";

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

user.get("/me", isauthorized, userDetails);
user.post("/verify-otp", isauthorized, verifyOTP);
user.put("/detail", isauthorized, updateUserDetails);
user.patch("/reset/uploads", isauthorized, isAdmin, resetUploadCount);
user.patch("/password", isauthorized, isVerified, updateUserPassword);
user.get("/all", isauthorized, isAdmin, allUsers);

export default user;
