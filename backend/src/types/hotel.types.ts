import { Document } from "mongoose";

export default interface IHotel extends Document {
  hotelName: string;
  description: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  rating: number;
  rooms: string[];
  cheapestPrice: number;
  featured: boolean;
}
