import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createRoomSchema } from "../utils/validations/room/createRoom.validation";
import {
  createRoom,
  deleteRoom,
  getRoomById,
  getRooms,
  updateRoom,
} from "../controllers/rooms.controllers";
import { updateRoomSchema } from "../utils/validations/room/updateRoom.validation";
const router = express.Router();

// CREATE
router
  .route("/hotel/:hotelId")
  .post(
    authMiddleware,
    adminMiddleware,
    validate(createRoomSchema),
    createRoom
  );

// READ / UPDATE / DELETE
router.route("/").get(getRooms);
router
  .route("/:roomId")
  .get(getRoomById)
  .put(authMiddleware, adminMiddleware, validate(updateRoomSchema), updateRoom)
  .delete(authMiddleware, adminMiddleware, deleteRoom);

export default router;
