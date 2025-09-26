import Hotel from "../models/hotel.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import IHotel from "../types/hotel.types";
import IAppError from "../types/appError.types";
import createError from "../utils/createError";

// CREATE
export const createHotel = async (
  req: Request<{}, {}, IHotel>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  try {
    const newHotel = new Hotel(body);
    await newHotel.save();
    res.status(201).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        hotel: newHotel,
      },
      message: "Hotel Created Successfully",
    });
  } catch (err: any) {
    return next(createError(err.message, 500));
  }
};
