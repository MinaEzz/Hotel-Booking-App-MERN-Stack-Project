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
const router = express.Router();

// CREATE
router.post("/", validate(createHotelSchema), createHotel);

// READ
router.get("/", getHotels);
router.get("/:hotelId", getHotelById);

// UPDATE
router.put("/:hotelId", validate(updateHotelSchema), updateHotel);

// DELETE
router.delete("/:hotelId", deleteHotel);

export default router;
