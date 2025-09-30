import mongoose from "mongoose";
import IRoom from "../types/room.types";

const roomShcema = new mongoose.Schema<IRoom>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IRoom>("Room", roomShcema);
