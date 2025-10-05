import { z } from "zod";

export const createHotelSchema = z.object({
  hotelName: z
    .string()
    .min(1, "Hotel name is required")
    .max(100, "Hotel name must be less than 100 characters"),
  desc: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  type: z.string().min(1, "Type is required").max(50),
  address: z.string().min(1, "Address is required").max(200),
  distance: z.string().min(1, "Distance is required"),
  photos: z.array(z.string()).optional(),
  rating: z.number().min(0).max(5).optional(),
  rooms: z.array(z.string()).optional(),
  cheapestPrice: z.number().positive("Cheapest price must be greater than 0"),
  featured: z.boolean().optional(),
  country: z.object({
    name: z.string().min(1, "Country name is required"),
    code: z.string().min(1, "Country code is required"),
  }),
});

export type CreateHotelInput = z.infer<typeof createHotelSchema>;
