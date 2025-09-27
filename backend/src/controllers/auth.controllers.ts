import User from "../models/user.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import IUser from "../types/user.types";
import createError from "../utils/createError";

export const register = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(
        createError("Email or Username Already Exists", 400, STATUSTEXT.FAIL)
      );
    }
    const user = new User({
      username,
      email,
      password,
    });
    await user.save();
    // remove password before return user object
    const { password: _pw, ...userData } = user.toObject();
    res.status(201).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        user: userData,
      },
      message: "User Created Successfully",
    });
  } catch (error: unknown) {
    console.log("REGISTER USER ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    if ((error as any).code === 11000) {
      return next(
        createError("Email or Username Already Exists", 400, STATUSTEXT.FAIL)
      );
    }
    return next(createError("Unexpected error", 500));
  }
};
