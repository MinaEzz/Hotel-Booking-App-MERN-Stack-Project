import { Document, Types } from "mongoose";

export default interface IRoom extends Document {
  _id: Types.ObjectId;
  title: string;
  price: number;
  desc: string;
  maxPeople: number;
  roomNumbers: { number: number; unavailableDates: Date[] }[];
  hotel: Types.ObjectId;
}
