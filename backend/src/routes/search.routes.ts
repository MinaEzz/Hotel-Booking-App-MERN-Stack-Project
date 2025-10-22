import express from "express";
import { searchHotels, searchRooms } from "../controllers/search.controllers";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/hotels/:countryCode").get(authMiddleware, searchHotels);

router.route("/rooms/hotel/:hotelId").get(authMiddleware, searchRooms);

export default router;
