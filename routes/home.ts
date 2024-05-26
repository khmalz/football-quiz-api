import { Hono } from "hono";

const home = new Hono({ strict: false });

home.get("/", c => {
   return c.json({ message: "Hello Hono with Bun!" });
});

export default home;
