import { z } from "zod";

export const createRoomSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  price: z
    .number({ error: "Price must be a number" })
    .positive("Price must be positive"),

  desc: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),

  maxPeople: z
    .number({ error: "Max people must be a number" })
    .min(1, "At least 1 person required"),

  roomNumbers: z
    .array(
      z.object({
        number: z.number().min(1, "Room number must be positive"),
        unavailableDates: z.array(z.date()).optional(),
      })
    )
    .optional(),
});

export type CreateRoomInput = z.infer<typeof createRoomSchema>;
