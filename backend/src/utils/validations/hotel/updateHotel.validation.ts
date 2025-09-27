import z from "zod";
import { createHotelSchema } from "./createHotel.validation";

export const updateHotelSchema = createHotelSchema.partial();

export type UpdateHotelInput = z.infer<typeof updateHotelSchema>;
