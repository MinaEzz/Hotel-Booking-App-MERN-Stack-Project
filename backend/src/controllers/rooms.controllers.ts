import Room from "../models/room.model";
import Hotel from "../models/hotel.model";
import STATUSTEXT from "../constants/httpStatusText";
import { Request, Response, NextFunction } from "express";
import createError from "../utils/createError";
import mongoose from "mongoose";
import { CreateRoomInput } from "../utils/validations/room/createRoom.validation";
import { updateRoomInput } from "../utils/validations/room/updateRoom.validation";

// CREATE
export const createRoom = async (
  req: Request<{ hotelId: string }, {}, CreateRoomInput>,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  const body = req.body;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const hotel = await Hotel.findById(hotelId).session(session);
    if (!hotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    const room = new Room({ ...body, hotel: hotel._id });
    await room.save({ session });
    await hotel.updateOne({ $push: { rooms: room._id } }, { session });
    await session.commitTransaction();
    res.status(201).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        room,
      },
      message: "Room Created Successfully",
    });
  } catch (error: unknown) {
    await session.abortTransaction();
    session.endSession();
    console.log("CREATE ROOM ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  } finally {
    session.endSession();
  }
};

// UPDATE
export const updateRoom = async (
  req: Request<{ roomId: string }, {}, updateRoomInput>,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;
  const body = req.body;
  try {
    const room = await Room.findByIdAndUpdate(roomId, body, {
      new: true,
      runValidators: true,
    });
    if (!room) {
      return next(createError("Room Not Found", 404, STATUSTEXT.FAIL));
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        room,
      },
      message: "Room Updated Successfully",
    });
  } catch (error: unknown) {
    console.log("UPDATE ROOM ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// DELETE
export const deleteRoom = async (
  req: Request<{ roomId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const room = await Room.findById(roomId).session(session);
    if (!room) {
      return next(createError("Room Not Found", 404, STATUSTEXT.FAIL));
    }
    const hotel = await Hotel.findById(room.hotel).session(session);
    if (!hotel) {
      return next(createError("Hotel Not Found", 404, STATUSTEXT.FAIL));
    }
    await room.deleteOne({ session });
    await hotel.updateOne({ $pull: { rooms: room._id } }, { session });
    await session.commitTransaction();
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: room,
      message: "Room Has Been Deleted",
    });
  } catch (error: unknown) {
    console.log("DELETE ROOM ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  } finally {
    session.endSession();
  }
};

// READ ALL ROOMS
export const getRooms = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    if (rooms.length === 0) {
      return res.status(204).json({
        status: STATUSTEXT.SUCCESS,
        data: { rooms: [] },
        message: "No Rooms In The Database",
        results: rooms.length,
      });
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: {
        rooms,
      },
      message: "Rooms Fetched Successfully",
      results: rooms.length,
    });
  } catch (error: unknown) {
    console.log("GET ROOMS ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};

// READ ROOM BY ID
export const getRoomById = async (
  req: Request<{ roomId: string }>,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return next(createError("Room Not Found", 404, STATUSTEXT.FAIL));
    }
    res.status(200).json({
      status: STATUSTEXT.SUCCESS,
      data: { room },
      message: "Room Fetched Successfully",
    });
  } catch (error: unknown) {
    console.log("GET Room ERROR: ", error);
    if (error instanceof Error) {
      return next(createError(error.message, 500));
    }
    return next(createError("Unexpected error", 500));
  }
};
