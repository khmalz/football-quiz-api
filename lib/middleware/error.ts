import { Context } from "hono";

export const errorHandler = async (err: Error, c: Context<any>) => {
   console.error("Error occurred:", err);
   return c.json({ status: false, statusCode: 500, message: err.message || "Internal Server Error" });
};

export const errorMiddleware = async (c: Context<any>, next: () => Promise<any>) => {
   try {
      await next();
   } catch (err: any) {
      throw err;
   }
};
