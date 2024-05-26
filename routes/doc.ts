import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, z } from "@hono/zod-openapi";

const doc = new OpenAPIHono();

doc.doc("/", {
   openapi: "3.1.0",
   info: {
      version: "1.0.0",
      title: "Football Quiz API",
   },
});

doc.openapi(
   {
      tags: ["Testing"],
      method: "get",
      path: "/api/hello",
      request: {
         query: z.object({
            name: z.string().openapi({
               param: {
                  name: "name",
                  in: "query",
                  required: false,
               },
               type: "String",
               example: "John",
            }),
         }),
      },
      responses: {
         200: {
            content: {
               "application/json": {
                  schema: z.object({
                     data: z.string().default("Hello, World!"),
                  }),
               },
            },
            description: "Successful response",
         },
         500: {
            content: {
               "application/json": {
                  schema: z.object({
                     status: z.boolean().default(false),
                     statusCode: z.number().default(500),
                     message: z.string().default("Internal Server Error"),
                  }),
               },
            },
            description: "Internal server error response",
         },
      },
   },
   c => {
      return c.json(
         {
            data: "Hello, World",
         },
         200
      );
   }
);

// @ts-ignore
doc.get("/ui", swaggerUI({ url: "/doc" }));

export default doc;
