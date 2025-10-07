import User from "../models/user.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import IUser from "../types/user.types";
import createError from "../utils/createError";
import IAuthRequest from "../types/authRequest.types";
import { UpdateUserInput } from "../utils/validations/user/updateUser.validation";

// CREATE
export const createUser = async (
  req: Request<{}, {}, IUser>,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });
    if (existingUser) {
      return next(
        createError("Email or Username Already Exists", 400, STATUSTEXT.FAIL)
      );
    }
    const user = new User({
      username,
      email,
      password,
      isAdmin,
    });
    await user.save();
    const { password: _pw, otp: _o, ...userData } = user.toObject();

    res.status(201).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        user: userData,
      },
      message: "User Created Successfully",
    });
  } catch (error: unknown) {
    console.log("CREATE User ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// UPDATE
export const updateUser = async (
  req: IAuthRequest<{ userId: string }, {}, UpdateUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;

  try {
    if (!req.user || req.user._id.toString() !== userId) {
      return next(createError("Unauthorized.", 401, STATUSTEXT.FAIL));
    }
    const user = await User.findById(userId);
    if (!user) {
      return next(createError("User Not Found", 404, STATUSTEXT.FAIL));
    }
    if (username) user.username = username;
    if (email) user.email = email;
    if (password) user.password = password;
    await user.save();
    const { password: _pw, otp: _o, ...userData } = user.toObject();
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        user: userData,
      },
      message: "User Updated Successfully",
    });
  } catch (error: unknown) {
    console.log("UPDATE USER ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// DELETE
export const deleteUser = async (
  req: IAuthRequest<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    if (
      !req.user ||
      (req.user._id.toString() !== userId && !req.user.isAdmin)
    ) {
      return next(createError("Unauthorized.", 401, STATUSTEXT.FAIL));
    }
    if (req.user.isAdmin && req.user._id.toString() === userId) {
      return next(
        createError(
          "Admin cannot delete their own account",
          400,
          STATUSTEXT.FAIL
        )
      );
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(createError("User Not Found", 404, STATUSTEXT.FAIL));
    }
    const { password: _pw, otp: _o, ...userData } = user.toObject();
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        user: userData,
      },
      message: "User Deleted Successfully",
    });
  } catch (error: unknown) {
    console.log("DELETE USER ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// READ ALL
export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .select(["-password", "-otp"]);
    if (users.length === 0) {
      return res.status(204).json({
        status: STATUSTEXT.SUCCESS,
        data: { users: [] },
        message: "No Users In The Database",
        results: users.length,
      });
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        users,
      },
      message: "Users Fetched Successfully",
      results: users.length,
    });
  } catch (error: unknown) {
    console.log("GET ALL USERS ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// READ BY ID
export const getUserById = async (
  req: IAuthRequest<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    if (
      !req.user ||
      (req.user._id.toString() !== userId && !req.user.isAdmin)
    ) {
      return next(createError("Unauthorized.", 401, STATUSTEXT.FAIL));
    }
    const user = await User.findById(userId).select(["-password", "-otp"]);
    if (!user) {
      return next(createError("User Not Found", 404, STATUSTEXT.FAIL));
    }
    // prevent admin from getting another admin
    //     if (user.isAdmin && req.user._id.toString() !== userId) {
    //   return next(createError("Unauthorized.", 401, STATUSTEXT.FAIL));
    // }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        user,
      },
      message: "User Fetched Successfully",
    });
  } catch (error: unknown) {
    console.log("GET USER ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
