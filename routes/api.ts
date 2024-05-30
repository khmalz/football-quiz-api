import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { addDocument, addDocumentToSubCollectionWithFixedId, retrieveDataByFields, retrieveDataSubByDocId } from "../lib/firestore/service";
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

api.post(
   "/users",
   zValidator(
      "json",
      z
         .object({
            username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be less than 10 characters" }),
            name: z.string({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters" }).max(100, { message: "Name must be less than 100 characters" }),
         })
         .required()
   ),
   async c => {
      const { username, name } = c.req.valid("json");

      const existingUsers = await retrieveDataByFields("users", [{ field: "username", value: username }]);
      if (existingUsers.length > 0) {
         return c.json({ success: false, statusCode: 400, message: "Username already exists" }, 400);
      }

      const res = await addDocument("users", { username, name });

      if (!res) {
         throw new Error("Failed to add User");
      }

      return c.json({ success: true, statusCode: 200, data: { id: res.id, username, name } });
   }
);

const validCategories = ["championsleague", "premierleague", "laliga"] as const;

api.post(
   "/score",
   zValidator(
      "json",
      z
         .object({
            id: z.string({ message: "Id is required" }).min(3, { message: "Id must be at least 3 characters" }),
            category: z.enum(validCategories, { message: "Category must be one of the league" }),
            level: z.string({ message: "level name is required" }).min(1, { message: "level name must be at least 1 character" }),
            score: z.number({ message: "Score is required" }).min(0, { message: "Score must be at least 0" }).max(100, { message: "Score must be at most 100" }),
         })
         .required()
   ),
   async c => {
      try {
         const { id, category, level, score } = c.req.valid("json");
         const data = { [level]: score };

         await addDocumentToSubCollectionWithFixedId("users", id, "scores", category, data);

         return c.json({ success: true, statusCode: 200, data: { id_user: id, category, level, score } });
      } catch (error: any) {
         throw error.message;
      }
   }
);

api.get(
   "/questions/category/:category",
   zValidator(
      "param",
      z
         .object({
            category: z.enum(validCategories),
         })
         .required(),
      (result, c) => {
         if (!result.success) {
            return c.json(
               {
                  success: false,
                  statusCode: 400,
                  message: "Invalid param",
               },
               400
            );
         }
      }
   ),
   async c => {
      const { category } = c.req.valid("param");

      const questions = await retrieveDataSubByDocId("categories", category, "questions");

      return c.json({
         success: true,
         statusCode: 200,
         data: { type: category, questions },
      });
   }
);

api.use(errorMiddleware);
api.onError(errorHandler);

export default api;
