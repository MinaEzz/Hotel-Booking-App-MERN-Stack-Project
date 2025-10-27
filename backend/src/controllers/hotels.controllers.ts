import Hotel from "../models/hotel.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import { CreateHotelInput } from "../utils/validations/hotel/createHotel.validation";
import { UpdateHotelInput } from "../utils/validations/hotel/updateHotel.validation";

// CREATE
export const createHotel = async (
  req: Request<{}, {}, CreateHotelInput>,
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
  } catch (error: unknown) {
    console.log("CREATE HOTEL ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// UPDATE
export const updateHotel = async (
  req: Request<{ hotelId: string }, {}, UpdateHotelInput>,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  const body = req.body;

  try {
    const hotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: body },
      { new: true, runValidators: true }
    );
    if (!hotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        hotel,
      },
      message: "Hotel Updated Successfully",
    });
  } catch (error: unknown) {
    console.log("UPDATE HOTEL ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// DELETE
export const deleteHotel = async (
  req: Request<{ hotelId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  console.log("DELETE HOTEL ID: ", hotelId);

  try {
    const hotel = await Hotel.findByIdAndDelete(hotelId);
    if (!hotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: hotel,
      message: "Hotel Has Been Deleted",
    });
  } catch (error: unknown) {
    console.log("DELETE HOTEL ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// READ ALL
export const getHotels = async (
  req: Request<{}, {}, {}, { page?: string; limit?: string }>,
  res: Response,
  next: NextFunction
) => {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");
  const skip = (page - 1) * limit;
  try {
    const [hotels, total] = await Promise.all([
      Hotel.find().sort({ createdAt: -1 }).limit(limit).skip(skip),
      Hotel.countDocuments(),
    ]);
    if (hotels.length === 0) {
      return res.status(204).json({
        status: STATUSTEXT.SUCCESS,
        data: { hotels: [] },
        message: "No Hotels In The Database",
        results: 0,
      });
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        hotels,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          total,
          limit,
        },
      },
      message: "Hotels Fetched Successfully",
      results: hotels.length,
    });
  } catch (error: unknown) {
    console.log("GET HOTELS ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// READ BY ID
export const getHotelById = async (
  req: Request<{ hotelId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  console.log("GET HOTEL ID: ", hotelId);

  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: { hotel },
      message: "Hotel Fetched Successfully",
    });
  } catch (error: unknown) {
    console.log("GET HOTEL ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// READ FETURED HOTELS
export const getFeaturedHotels = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hotels = await Hotel.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(3);
    if (hotels.length === 0) {
      return res.status(204).json({
        status: STATUSTEXT.SUCCESS,
        data: { hotels: [] },
        message: "No Featured Hotels In The Database",
        results: 0,
      });
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: { hotels },
      message: "Featured Hotels Fetched Successfully",
      results: hotels.length,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
