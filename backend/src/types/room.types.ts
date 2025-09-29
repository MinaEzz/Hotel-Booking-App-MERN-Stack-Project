import { Document, Types } from "mongoose";

export interface IRoom extends Document {
  title: string;
  price: number;
  desc: string;
  maxPeople: number;
  roomNumbers: { number: number; unavailableDates: Date[] }[];
  hotel: Types.ObjectId;
}
