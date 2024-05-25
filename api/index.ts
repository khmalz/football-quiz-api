import { Hono } from "hono";
import { cors } from "hono/cors";
import { validator } from "hono/validator";
import { handle } from "hono/vercel";

import { retrieveData, retrieveDataSubByDocId } from "../lib/firestore/service";
import { errorHandler, errorMiddleware } from "../lib/middleware/error";

export const config = {
   runtime: "edge",
};

const app = new Hono().basePath("/api");
app.use("/api/*", cors());

app.get("/", c => {
   return c.json({ message: "Hello Hono with Bun!" });
});

app.get("/hello/:name", c => {
   const { name } = c.req.param();
   return c.json({ data: `Hello, ${name}!` });
});

app.get("/users", async c => {
   try {
      const users = await retrieveData("users");
      return c.json({ status: true, statusCode: 200, data: users });
   } catch (error) {
      throw error;
   }
});

const validCategories = ["championsleague", "premierleague", "laliga"];

app.get(
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

app.use(errorMiddleware);
app.onError(errorHandler);

export default app;
// export default handle(app);
