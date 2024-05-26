import { Hono } from "hono";
import { cors } from "hono/cors";
import { validator } from "hono/validator";

import { retrieveData, retrieveDataSubByDocId } from "../lib/firestore/service";
import { errorHandler, errorMiddleware } from "../lib/middleware/error";

const api = new Hono({ strict: false });
api.use("/*", cors());

api.get("/", c => {
   return c.json({ message: "Hello API with Hono!" });
});

api.get("/hello", c => {
   const { name } = c.req.query();
   return c.json({ data: `Hello, ${name || "World"}!` });
});

api.get("/users", async c => {
   try {
      const users = await retrieveData("users");
      return c.json({ status: true, statusCode: 200, data: users });
   } catch (error) {
      throw error;
   }
});

const validCategories = ["championsleague", "premierleague", "laliga"];

api.get(
   "/questions/category/:category",
   validator("param", (value: { category: string }, c) => {
      const { category } = value;
      if (typeof category !== "string" || !validCategories.includes(category)) {
         return c.json(
            {
               status: false,
               statusCode: 400,
               message: "Invalid param",
            },
            400
         );
      }

      return { category };
   }),
   async c => {
      const { category } = c.req.valid("param");

      const questions = await retrieveDataSubByDocId("categories", category, "questions");

      return c.json({
         status: true,
         statusCode: 200,
         data: { type: category, questions },
      });
   }
);

api.use(errorMiddleware);
api.onError(errorHandler);

export default api;
