import { swaggerUI } from "@hono/swagger-ui";
import { Hono } from "hono";

import { openApiSpec } from "../data/swagger/routes";

const doc = new Hono();

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
doc.get("/ui", swaggerUI({ url: "/", version: "3.1.0", spec: openApiSpec, plugins: [DisableTryItOutPlugin] }));

export default doc;
