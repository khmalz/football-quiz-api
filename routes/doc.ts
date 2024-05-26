import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

import { questionsRoute, sayHello, testingConnection } from "../data/swagger/routes";

const doc = new OpenAPIHono();

doc.doc("/", {
   openapi: "3.1.0",
   info: {
      version: "1.0.0",
      title: "Football Quiz API",
   },
});

// @ts-ignore
doc.openapi(sayHello, c => {
   return c.json(
      {
         data: "Hello, World",
      },
      200
   );
});

// @ts-ignore
doc.openapi(testingConnection, c => {
   return c.json(
      {
         status: true,
         statusCode: 200,
         data: [
            {
               id: "1BJB21",
               name: "Name",
            },
         ],
      },
      200
   );
});

// @ts-ignore
doc.openapi(questionsRoute, c => {
   // @ts-ignore
   const { category } = c.req.valid("param");

   return c.json(
      {
         status: true,
         statusCode: 200,
         data: {
            type: category,
            questions: [
               {
                  question: "Question",
                  options: ["A", "B", "C", "D"],
                  answer: "Answer",
               },
            ],
         },
      },
      200
   );
});

const DisableTryItOutPlugin = function () {
   return {
      statePlugins: {
         spec: {
            wrapSelectors: {
               allowTryItOutFor: () => () => false,
            },
         },
      },
   };
};

// @ts-ignore
doc.get("/ui", swaggerUI({ url: "/doc", plugins: [DisableTryItOutPlugin] }));

export default doc;
