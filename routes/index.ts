import { Hono } from "hono";
import { handle } from "hono/vercel";

import api from "./api";
import home from "./home";

export const config = {
   runtime: "edge",
};

const app = new Hono();
app.route("/", home);
app.route("/api", api);

// in development
// export default app;

// in vercel deployment
export default handle(app);
