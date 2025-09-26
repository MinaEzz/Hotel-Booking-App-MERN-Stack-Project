import express from "express";
import { createHotel } from "../controllers/hotels.controllers";
import validate from "../middlewares/validate";
import { createHotelSchema } from "../utils/validations/hotel.validation";
const router = express.Router();

// CREATE
router.post("/", validate(createHotelSchema), createHotel);

// READ

// UPDATE

// DELETE

export default router;
