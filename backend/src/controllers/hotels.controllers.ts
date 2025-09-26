import Hotel from "../models/hotel.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import IHotel from "../types/hotel.types";
import createError from "../utils/createError";

// CREATE
export const createHotel = async (
  req: Request<{}, {}, IHotel>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  console.log("CREATE HOTEL BODY: ", body);
  try {
    const hotel = new Hotel(body);
    await hotel.save();
    res.status(201).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        hotel,
      },
      message: "Hotel Created Successfully",
    });
  } catch (error: any) {
    console.log("CREATE HOTEL ERROR: ", error);
    return next(createError(error.message, 500));
  }
};

// UPDATE
export const updateHotel = async (
  req: Request<{ hotelId: string }, {}, IHotel>,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  console.log("UPDATE HOTEL ID: ", hotelId);
  const body = req.body;
  console.log("UPDATE HOTEL BODY: ", req.body);
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedHotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        hotel: updatedHotel,
      },
      message: "Hotel Updated Successfully",
    });
  } catch (error: any) {
    console.log("UPDATE HOTEL ERROR: ", error);
    return next(createError(error.message, 500));
  }
};
