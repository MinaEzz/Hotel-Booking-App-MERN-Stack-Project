import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import HttpStatusText from "../constants/httpStatusText";

const validate =
  (schema: ZodObject<any>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = err.issues.map((issue) => ({
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

export default validate;
