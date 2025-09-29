import User from "../models/user.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Response, NextFunction } from "express";
import createError from "../utils/createError";
import jwt from "jsonwebtoken";
import IAuthRequest from "../types/authRequest.types";

export async function authMiddleware(
  req: IAuthRequest,
  _res: Response,
  next: NextFunction
) {
  const { token } = req.cookies;
  if (!token) {
    return next(
      createError(
        "Unauthorized, you need to login to access this.",
        401,
        STATUSTEXT.FAIL
      )
    );
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    console.log("AUTH MIDDLEWARE DECODED TOKEN: ", decodedToken);
    if (typeof decodedToken === "string" || !("id" in decodedToken)) {
      return next(createError("Invalid token", 401, STATUSTEXT.FAIL));
    }
    const user = await User.findById(decodedToken.id).select([
      "-password",
      "-otp",
    ]);
    if (!user) {
      return next(createError("User not found", 404, STATUSTEXT.FAIL));
    }
    console.log("AUTH MIDDLEWARE USER: ", user);
    req.user = user;
    next();
  } catch (error) {
    console.log("AUTH MIDDLEWARE ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
}
