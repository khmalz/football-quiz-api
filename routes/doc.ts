import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

const doc = new OpenAPIHono();

doc.doc("/", {
   openapi: "3.1.0",
   info: {
      version: "1.0.0",
      title: "Football Quiz API",
   },
});

// @ts-ignore
doc.get("/ui", swaggerUI({ url: "/doc" }));

export default doc;
