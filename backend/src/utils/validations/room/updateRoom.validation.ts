import z from "zod";
import { createRoomSchema } from "./createRoom.validation";

export const updateRoomSchema = createRoomSchema.partial();

export type updateRoomInput = z.infer<typeof updateRoomSchema>;
