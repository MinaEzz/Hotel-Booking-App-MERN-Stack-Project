import { Response, NextFunction } from "express";
import createError from "../utils/createError";
import STATUSTEXT from "../constants/httpStatusText";
import IAuthRequest from "../types/authRequest.types";

export function adminMiddleware(
  req: IAuthRequest,
  _res: Response,
  next: NextFunction
) {
  if (!req.user) {
    return next(
      createError("Unauthorized. Please login first.", 401, STATUSTEXT.FAIL)
    );
  }
  if (!req.user.isAdmin) {
    return next(
      createError("Forbidden. Admin access only.", 403, STATUSTEXT.FAIL)
    );
  }
  next();
}
