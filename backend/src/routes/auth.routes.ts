import express from "express";
import { register } from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../utils/validations/auth/register.validation";
const router = express.Router();

// REGISTER
router.route("/register").post(validate(registerSchema), register);

// LOGIN

// GET LOGGED IN USER

// LOGOUT

// FORGOT PASSWORD

// RESET PASSWORD

export default router;
