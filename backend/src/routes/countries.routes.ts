import express from "express";
import { getCountries } from "../controllers/countries.controllers";
const router = express.Router();


router.route("/").get(getCountries);


export default router