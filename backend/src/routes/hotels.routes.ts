import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotelById,
  getHotels,
  updateHotel,
} from "../controllers/hotels.controllers";
import { validate } from "../middlewares/validate.middleware";
import { createHotelSchema } from "../utils/validations/hotel/createHotel.validation";
import { updateHotelSchema } from "../utils/validations/hotel/updateHotel.validation";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
const router = express.Router();

// CREATE
router
  .route("/")
  .post(
    authMiddleware,
    adminMiddleware,
    validate(createHotelSchema),
    createHotel
  );

// READ / UPDATE / DELETE
router.route("/").get(getHotels);
router
  .route("/:hotelId")
  .get(getHotelById)
  .put(
    authMiddleware,
    adminMiddleware,
    validate(updateHotelSchema),
    updateHotel
  )
  .delete(adminMiddleware, adminMiddleware, deleteHotel);

export default router;
