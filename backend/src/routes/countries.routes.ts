import express from "express";
import {
  getCountries,
  setCountries,
} from "../controllers/countries.controllers";
const router = express.Router();

router.route("/").get(getCountries).post(setCountries);

export default router;
