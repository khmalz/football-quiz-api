import { Hono } from "hono";
import { handle } from "hono/vercel";

import api from "./api";
import home from "./home";
import doc from "./doc";

const app = new Hono();
app.route("/", home);
app.route("/api", api);
app.route("/doc", doc);

// in development
// export default app;

// in vercel deployment
export default handle(app);
