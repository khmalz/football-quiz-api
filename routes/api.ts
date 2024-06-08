import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { hashSync, compareSync } from "bcrypt-edge";

import {
   addDocument,
   addDocumentToSubCollectionWithFixedId,
   retrieveAllScoreUser,
   retrieveDataByDocId,
   retrieveDataByFields,
   retrieveDataSubByDocId,
   retrieveDataSubByFieldsByDocId,
   retrieveThirdDocByDocId,
   updateDocument,
} from "../lib/firestore/service";
import { errorHandler, errorMiddleware } from "../lib/middleware/error";
import { User } from "../data/interface/user";

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
   "/users/get",
   zValidator(
      "json",
      z
         .object({
            username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be less than 10 characters" }),
            password: z.string({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
         })
         .required()
   ),
   async c => {
      const { username, password } = c.req.valid("json");

      const existingUsers = await retrieveDataByFields("users", [{ field: "username", value: username }]);
      if (existingUsers.length == 0) {
         throw new HTTPException(404, { message: "User not found" });
      }

      const userDoc: User = existingUsers[0] as User;

      const passwordMatch = compareSync(password, userDoc.password);
      if (!passwordMatch) {
         throw new HTTPException(401, { message: "Incorrect password" });
      }

      const user = {
         id: userDoc.id,
         username: userDoc.username,
         name: userDoc.name,
      };

      return c.json({ success: true, statusCode: 200, data: user });
   }
);

api.put(
   "/users/edit",
   zValidator(
      "json",
      z
         .object({
            id: z.string({ message: "Id is required" }).min(3, { message: "Id must be at least 3 characters" }).max(30, { message: "Id must be less than 30 characters" }),
            username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be less than 10 characters" }),
            name: z.string({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters" }).max(100, { message: "Name must be less than 100 characters" }),
         })
         .required()
   ),
   async c => {
      const { id, username, name } = c.req.valid("json");

      const existingUsers = await retrieveDataByDocId("users", id);
      if (!existingUsers || existingUsers.length === 0) {
         throw new HTTPException(404, { message: "User not found" });
      }

      await updateDocument("users", id, { username, name });

      return c.json({ success: true, statusCode: 201, data: { id, username, name } }, 201);
   }
);

api.put(
   "/users/changepassword",
   zValidator(
      "json",
      z
         .object({
            id: z.string({ message: "Id is required" }).min(3, { message: "Id must be at least 3 characters" }).max(30, { message: "Id must be less than 30 characters" }),
            oldPassword: z.string({ message: "Old Password is required" }).min(6, { message: "Old Password must be at least 6 characters" }),
            newPassword: z.string({ message: "New Password is required" }).min(6, { message: "New Password must be at least 6 characters" }),
         })
         .required()
   ),
   async c => {
      const { id, oldPassword, newPassword } = c.req.valid("json");

      const existingUsers = await retrieveDataByDocId("users", id);
      if (!existingUsers || existingUsers.length === 0) {
         throw new HTTPException(404, { message: "User not found" });
      }

      const userDoc: User = existingUsers as User;

      const passwordMatch = compareSync(oldPassword, userDoc.password);
      if (!passwordMatch) {
         throw new HTTPException(401, { message: "Incorrect password" });
      }

      const hashedPassword = hashSync(newPassword, 10);
      await updateDocument("users", id, { password: hashedPassword });

      return c.json({ success: true, statusCode: 201, data: { id, username: userDoc.username, name: userDoc.name } }, 201);
   }
);

api.post(
   "/users",
   zValidator(
      "json",
      z
         .object({
            username: z.string({ message: "Username is required" }).min(3, { message: "Username must be at least 3 characters" }).max(10, { message: "Username must be less than 10 characters" }),
            name: z.string({ message: "Name is required" }).min(3, { message: "Name must be at least 3 characters" }).max(100, { message: "Name must be less than 100 characters" }),
            password: z.string({ message: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }),
         })
         .required()
   ),
   async c => {
      const { username, name, password } = c.req.valid("json");

      const existingUsers = await retrieveDataByFields("users", [{ field: "username", value: username }]);
      if (existingUsers.length > 0) {
         throw new HTTPException(409, { message: "Username already exists" });
      }

      const hashedPassword = hashSync(password, 10);
      const res = await addDocument("users", { username, name, password: hashedPassword });

      if (!res) {
         throw new Error("Failed to add User");
      }

      return c.json({ success: true, statusCode: 201, data: { id: res.id, username, name } }, 201);
   }
);

const validCategories = ["championsleague", "premierleague", "laliga"] as const;

api.post(
   "/score/get",
   zValidator(
      "json",
      z
         .object({
            id: z.string({ message: "Id is required" }).min(3, { message: "Id must be at least 3 characters" }),
            category: z.enum(validCategories, { message: "Category must be one of the league" }),
         })
         .required()
   ),
   async c => {
      const body = c.req.valid("json");

      let res = await retrieveThirdDocByDocId("users", body.id, "scores", body.category);

      if (!res) {
         throw new HTTPException(404, { message: "The document of the category not found" });
      }

      const { id, ...resWithoutId } = res;

      return c.json({ success: true, statusCode: 200, data: { id_user: body.id, category: body.category, ...resWithoutId } }, 200);
   }
);

api.post(
   "/score",
   zValidator(
      "json",
      z
         .object({
            id: z.string({ message: "Id is required" }).min(3, { message: "Id must be at least 3 characters" }),
            category: z.enum(validCategories, { message: "Category must be one of the league" }),
            level: z.number({ message: "Level is required" }).min(1, { message: "Level must be at least 1" }),
            score: z.number({ message: "Score is required" }).min(0, { message: "Score must be at least 0" }).max(100, { message: "Score must be at most 100" }),
         })
         .required()
   ),
   async c => {
      const { id, category, level, score } = c.req.valid("json");

      // Retrieve the existing document
      const existingDoc: any = await retrieveThirdDocByDocId("users", id, "scores", category);

      let data: any = {};
      let responseData: any = {};
      const currentDate = new Date().toISOString();

      if (existingDoc) {
         const currentLevel = existingDoc.current_level;
         const newLevel = currentLevel + 1;

         if (level <= currentLevel) {
            // User is repeating the level, update only if new score is higher
            const existingLevelData = existingDoc.levels?.[level];
            if (existingLevelData) {
               if (score > existingLevelData.score) {
                  data = { [`levels.${level}`]: { score, created_at: existingLevelData.created_at, updated_at: currentDate } };
                  responseData = { [`level${level}`]: score, created_at: existingLevelData.created_at, updated_at: currentDate };
               } else {
                  responseData = { [`level${level}`]: existingLevelData.score, created_at: existingLevelData.created_at, updated_at: existingLevelData.updated_at }; // Return existing data if the new score is not higher
               }
            } else {
               data = { [`levels.${level}`]: { score, created_at: currentDate, updated_at: currentDate } };
               responseData = { [`level${level}`]: score, created_at: currentDate, updated_at: currentDate };
            }
         } else if (level === newLevel) {
            if (score < 50) {
               throw new HTTPException(422, { message: "Score must be at least 50" });
            }

            // User is progressing to the next level
            data = { [`levels.${level}`]: { score, created_at: currentDate, updated_at: currentDate }, current_level: newLevel };
            responseData = { [`level${level}`]: score, created_at: currentDate, updated_at: currentDate, current_level: newLevel };
         } else {
            // Invalid level progression (query injection)
            throw new HTTPException(406, { message: "Invalid level progression" });
         }
      } else {
         // Document does not exist, create new document with level 1 and current_level 1
         if (level !== 1) {
            throw new HTTPException(409, { message: "Invalid initial level" });
         }

         if (score < 50) {
            throw new HTTPException(422, { message: "Score must be at least 50" });
         }
         data = { levels: { 1: { score, created_at: currentDate, updated_at: currentDate } }, current_level: 1 };
         responseData = { [`level${level}`]: score, created_at: currentDate, updated_at: currentDate, current_level: 1 };
      }

      // Add or update the document in sub-collection
      await addDocumentToSubCollectionWithFixedId("users", id, "scores", category, data);

      return c.json({ success: true, statusCode: 201, data: { id_user: id, category, ...responseData } }, 201);
   }
);

api.get(
   "/scores/get/:category",
   zValidator(
      "param",
      z
         .object({
            category: z.enum(validCategories, { message: "Category must be one of the league" }),
         })
         .required()
   ),
   zValidator(
      "query",
      z
         .object({
            sum: z.enum(["true", "false"], { message: "Sum is only allowed to be true or false" }),
         })
         .partial()
   ),
   async c => {
      const { category } = c.req.param();
      let { sum } = c.req.valid("query");

      // Set default value to "false" if sum is undefined
      sum = sum === undefined ? "false" : sum;

      const isSum: boolean = sum === "true";

      const scoreUsers = await retrieveAllScoreUser(category);

      if (scoreUsers.length === 0) {
         throw new HTTPException(404, { message: "The document of the category not found" });
      }

      const data = scoreUsers.map(user => {
         const { username, name, scores } = user;

         let scoreData;
         if (isSum) {
            const total = Object.values(scores.levels as Record<string, { score: number }>).reduce((acc, level) => acc + level.score, 0);
            scoreData = {
               category,
               total,
            };
         } else {
            scoreData = {
               category,
               levels: scores.levels,
            };
         }

         return {
            username,
            name,
            scores: scoreData,
         };
      });

      return c.json({
         success: true,
         statusCode: 200,
         data,
      });
   }
);

api.get(
   "/questions/category/:category",
   zValidator(
      "param",
      z
         .object({
            category: z.enum(validCategories, { message: "Category must be one of the league" }),
         })
         .required()
   ),
   async c => {
      const { category } = c.req.valid("param");

      const questions = await retrieveDataSubByDocId("categories", category, "questions");

      if (questions.length === 0) {
         throw new HTTPException(404, { message: "Questions not found" });
      }

      const filteredQuestions = questions.map(({ id, ...rest }: any) => rest);

      return c.json({
         success: true,
         statusCode: 200,
         data: { type: category, questions: filteredQuestions },
      });
   }
);

api.get(
   "/questions/category/:category/level/:level",
   zValidator(
      "param",
      z
         .object({
            category: z.enum(validCategories, { message: "Category must be one of the league" }),
            level: z.string({ message: "Level must be a string" }).min(1, { message: "Level must be at least 1" }).regex(/^\d+$/, { message: "Level must contain only digits" }),
         })
         .required()
   ),
   async c => {
      const { category, level } = c.req.valid("param");

      const questions = await retrieveDataSubByFieldsByDocId("categories", category, "questions", [{ field: "level", value: +level }]);

      if (questions.length === 0) {
         throw new HTTPException(404, { message: "Questions not found" });
      }

      const filteredQuestions = questions.map(({ mainDocId, subDocId, ...rest }: any) => rest);

      return c.json({
         success: true,
         statusCode: 200,
         data: { type: category, length: questions.length, level: +level, questions: filteredQuestions },
      });
   }
);

api.use(errorMiddleware);
api.onError(errorHandler);

export default api;
