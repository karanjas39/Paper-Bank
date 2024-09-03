import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import admin from "./routes/admin";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use("*", cors());

app.route("/api/v1/auth", auth);
app.route("/api/v1/admin", admin);

app.all(async (c) => {
  return c.json({
    success: true,
    status: 200,
    message: "Hello from paper bank :)",
  });
});

export default app;
