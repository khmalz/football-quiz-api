import { Hono } from "hono";
import { cors } from "hono/cors";

import { handle } from "hono/vercel";
import { errorHandler, errorMiddleware } from "../lib/middleware/error";

export const config = {
   runtime: "edge",
};

const app = new Hono().basePath("/api");
app.use("/api/*", cors());

app.get("/", c => {
   return c.json({ message: "Hello Hono with Bun!" });
});

app.get("/hello/:name", c => {
   const { name } = c.req.param();
   return c.json({ data: `Hello, ${name}!` });
});

app.use(errorMiddleware);
app.onError(errorHandler);

// export default app;
export default handle(app);
