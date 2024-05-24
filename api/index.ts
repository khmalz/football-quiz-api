import { Hono } from "hono";
import { handle } from "hono/vercel";

export const config = {
   runtime: "edge",
};

const app = new Hono().basePath("/api");

app.get("/", c => {
   return c.json({ message: "Hello Hono!" });
});

app.get("/hello/:name", c => {
   const { name } = c.req.param();
   return c.text(`Hello, ${name}!`);
});

// export default app;
export default handle(app);
