import { createRoute, z } from "@hono/zod-openapi";

export const sayHello = createRoute({
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
});

export const testingConnection = createRoute({
   tags: ["Testing"],
   method: "get",
   path: "/api/users",
   responses: {
      200: {
         content: {
            "application/json": {
               schema: z.object({
                  status: z.boolean(),
                  statusCode: z.number().default(400),
                  data: z.array(
                     z.object({
                        id: z.string(),
                        name: z.string(),
                     })
                  ),
               }),
            },
         },
         description: "Successful response",
      },
      404: {
         content: {
            "application/json": {
               schema: z.object({
                  status: z.boolean().default(false),
                  statusCode: z.number().default(404),
                  data: z.object({}),
               }),
            },
         },
         description: "Not found response",
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
});

export const questionsRoute = createRoute({
   tags: ["Questions"],
   method: "get",
   path: "/api/questions/category/{category}",
   request: {
      params: z.object({
         category: z.string().openapi({
            param: {
               name: "category",
               in: "path",
               description: "Available values: championsleague, premierleague, laliga",
            },
            type: "string",
         }),
      }),
   },
   responses: {
      200: {
         content: {
            "application/json": {
               schema: z.object({
                  status: z.boolean(),
                  statusCode: z.number().default(200),
                  data: z.object({
                     type: z.string(),
                     questions: z.array(
                        z.object({
                           question: z.string(),
                           options: z.array(z.string()),
                           answer: z.string(),
                        })
                     ),
                  }),
               }),
            },
         },
         description: "Successful response",
      },
      400: {
         content: {
            "application/json": {
               schema: z.object({
                  status: z.boolean().default(false),
                  statusCode: z.number().default(400),
                  message: z.string().default("Invalid param"),
               }),
            },
         },
         description: "Bad request response",
      },
      404: {
         content: {
            "application/json": {
               schema: z.object({
                  status: z.boolean().default(false),
                  statusCode: z.number().default(404),
                  data: z.object({}),
               }),
            },
         },
         description: "Not found response",
      },
   },
});
