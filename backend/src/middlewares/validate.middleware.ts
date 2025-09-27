import { z, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import HttpStatusText from "../constants/httpStatusText";

export function validate(schema: z.ZodObject<any, any>) {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
        return next(
          createError(
            "Validation failed",
            400,
            HttpStatusText.ERROR,
            formattedErrors
          )
        );
      }
      return next(createError("Validation failed", 400));
    }
  };
}
