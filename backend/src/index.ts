import { Hono } from "hono";
import { cors } from "hono/cors";
import auth from "./routes/auth";
import program from "./routes/program";
import email from "./routes/email";
import qp from "./routes/qp";
import notification from "./routes/notification";
import user from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    "my-app": KVNamespace;
  };
}>();

app.use("*", cors());

app.route("/api/v1/auth", auth);
app.route("/api/v1/email", email);
app.route("/api/v1/qp", qp);
app.route("/api/v1/program", program);
app.route("/api/v1/notification", notification);
app.route("/api/v1/user", user);

app.all(async (c) => {
  return c.json({
    success: true,
    status: 200,
    message: "Hello from paper bank :)",
  });
});

export default app;
