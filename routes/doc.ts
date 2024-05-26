import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";

const doc = new Hono();

// @ts-ignore
doc.get("/ui", swaggerUI({ url: "/", version: "3.1.0" }));

export default doc;