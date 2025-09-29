import { Document, Types } from "mongoose";

export default interface IHotel extends Document {
  hotelName: string;
  desc: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  rating: number;
  rooms: Types.ObjectId[];
  cheapestPrice: number;
  featured: boolean;
}
