import User from "../models/user.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import IUser from "../types/user.types";
import createError from "../utils/createError";
import generateOTP from "../utils/generateOtp";

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

export const loginSendOtp = async (
  req: Request<{}, {}, { identifier: string; password: string }>,
  res: Response,
  next: NextFunction
) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });
    if (!user) {
      return next(createError("User Not Found", 404, STATUSTEXT.FAIL));
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(createError("Invalid Credentials", 400, STATUSTEXT.FAIL));
    }
    const otp = generateOTP();
    console.log("OTP: ", otp);
    await user.setOtp(otp, Number(process.env.OTP_EXPIRE_MINUTES || 5));
    // await sendOtpEmail(user.email, otp);
    const { password: _pw, otp: _otp, ...userData } = user.toObject();
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: userData,
      message: "OTP sent to registered email. Please verify to complete login.",
    });
  } catch (error: unknown) {
    console.log("LOGIN SEND OTP ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

export const verifyOtpAndLogin = async (
  req: Request<{}, {}, { identifier: string; otp: string }>,
  res: Response,
  next: NextFunction
) => {
  const { identifier, otp } = req.body;
  try {
    const user = await User.findById(identifier);
    console.log("USER: ", user);
    if (!user)
      return next(createError("Invalid OTP or user", 400, STATUSTEXT.FAIL));
    if (!user.otp || !user.otp.codeHash) {
      return next(
        createError("OTP not requested or expired", 400, STATUSTEXT.FAIL)
      );
    }
    const isMatch = await user.verifyOtp(otp);
    console.log("OTP isMatch: ", isMatch);
    if (!isMatch) {
      // increment attempts (and optionally lock after N attempts)
      await user.incrementOtpAttempts(1);
      if (user.otp.attempts > 5) {
        user.otp.codeHash = null;
        user.otp.expiresAt = null;
        await user.save();
        return next(
          createError(
            "Too many invalid attempts. Please login again",
            401,
            STATUSTEXT.FAIL
          )
        );
      }
      return next(createError("Invalid OTP", 400, STATUSTEXT.FAIL));
    }
    user.otp = { codeHash: null, expiresAt: null, attempts: 0 };
    await user.save();
    const { password: _pw, otp: _o, ...userData } = user.toObject();
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: { user: userData },
      message: "OTP verified. Login successful.",
    });
  } catch (error: unknown) {
    console.log("VERIFY OTP ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
