import Hotel from "../models/hotel.model";
import Room from "../models/room.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";

// SEARCH HOTELS
export const searchHotels = async (
  req: Request<
    { countryCode: string },
    {},
    {},
    { page?: string; limit?: string }
  >,
  res: Response,
  next: NextFunction
) => {
  const { countryCode } = req.params;
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");
  const skip = (page - 1) * limit;
  try {
    const [hotels, total] = await Promise.all([
      Hotel.find({ "country.code": countryCode })
        .sort({
          createdAt: -1,
        })
        .limit(limit)
        .skip(skip),
      Hotel.countDocuments({ "country.code": countryCode }),
    ]);
    if (hotels.length === 0) {
      return res.status(204).json({
        status: STATUSTEXT.SUCCESS,
        data: { hotels: [] },
        message: "No Hotels Matching Your Search Criteria.",
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
    console.log("SEARCH HOTELS ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// SEARCH ROOMS
export const searchRooms = async (
  req: Request<
    { hotelId: string },
    {},
    {},
    {
      page?: string;
      limit?: string;
      guests?: string;
      checkIn?: string;
      checkOut?: string;
    }
  >,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  const guests = parseInt(req.query.guests || "1");
  const checkIn = new Date(req.query.checkIn || new Date());
  const checkOut = new Date(req.query.checkOut || new Date());
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");
  const skip = (page - 1) * limit;
  try {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    const rooms = await Room.find({
      hotel: hotel._id,
      maxPeople: { $gte: guests },
    })
      .limit(limit)
      .skip(skip);

    if (rooms.length === 0) {
      return res.status(204).json({
        status: STATUSTEXT.SUCCESS,
        data: { rooms: [] },
        message: "No Rooms Matching Your Search Criteria.",
        results: 0,
      });
    }

    const availableRooms = rooms.filter((room) => {
      return room.roomNumbers.some((roomNumber) => {
        const isUnavailable = roomNumber.unavailableDates.some((date) => {
          return date >= checkIn && date <= checkOut;
        });
        return !isUnavailable;
      });
    });

    return res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        rooms: availableRooms,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(rooms.length / limit),
          total: rooms.length,
          limit,
        },
      },
      message: "Available Rooms Fetched Successfully",
      results: availableRooms.length,
    });
  } catch (error: unknown) {
    console.log("SEARCH ROOMS ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
