import { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export const errorHandler = async (err: HTTPException | Error, c: Context<any>) => {
   console.error("Error occurred:", err);

   if (err instanceof HTTPException) {
      return c.json({ status: false, statusCode: err.status, message: err.message }, err.status);
   }

   return c.json({ status: false, statusCode: 500, message: err.message || "Internal Server Error" }, 500);
};

export const errorMiddleware = async (c: Context<any>, next: () => Promise<any>) => {
   try {
      await next();
   } catch (err: any) {
      throw err;
   }
};
