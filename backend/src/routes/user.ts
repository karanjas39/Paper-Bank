import { Hono } from "hono";
import { isAdmin, isauthorized, isVerified } from "../middlewares/auth";
import { allUsers } from "../controllers/user";

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

user.get("/all", isauthorized, isAdmin, allUsers);

export default user;
