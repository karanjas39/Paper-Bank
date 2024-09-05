import { Hono } from "hono";
import {
  allNotifications,
  deleteAllNotifications,
} from "../controllers/notification";
import { isauthorized } from "../middlewares/auth";

const notification = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    id: string;
    admin: boolean;
    verified: boolean;
  };
}>();

notification.get("/all", isauthorized, allNotifications);
notification.delete("/all", isauthorized, deleteAllNotifications);

export default notification;
