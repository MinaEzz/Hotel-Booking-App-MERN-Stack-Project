import express from "express";
import { createHotel, updateHotel } from "../controllers/hotels.controllers";
import validate from "../middlewares/validate";
import { createHotelSchema } from "../utils/validations/hotel/createHotel.validation";
import { updateHotelSchema } from "../utils/validations/hotel/updateHotel.validation";
const router = express.Router();

// CREATE
router.post("/", validate(createHotelSchema), createHotel);

// READ

// UPDATE
router.put("/:hotelId", validate(updateHotelSchema), updateHotel);

// DELETE

export default router;
