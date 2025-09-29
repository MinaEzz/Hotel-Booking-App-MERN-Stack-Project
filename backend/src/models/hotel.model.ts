import mongoose from "mongoose";
import IHotel from "../types/hotel.types";

const hotelSchema = new mongoose.Schema<IHotel>(
  {
    hotelName: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: String,
      required: true,
    },
    photos: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Room" }],
    cheapestPrice: {
      type: Number,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IHotel>("Hotel", hotelSchema);
