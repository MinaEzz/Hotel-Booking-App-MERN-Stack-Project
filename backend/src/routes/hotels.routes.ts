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
router.route("/").post(validate(createHotelSchema), createHotel);

// READ / UPDATE / DELETE
router.route("/").get(getHotels);
router
  .route("/:hotelId")
  .get(getHotelById)
  .put(validate(updateHotelSchema), updateHotel)
  .delete(deleteHotel);

export default router;
