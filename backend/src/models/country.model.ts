import mongoose from "mongoose";
import { ICountry } from "../types/country.types";

const countrySchema = new mongoose.Schema<ICountry>({
  name: {
    type: String,
    required: [true, "country name is required"],
    trim: true,
  },
  code: {
    type: String,
    required: [true, "country name is required"],
    trim: true,
    unique: true,
  },
});

export default mongoose.model("Country", countrySchema);
