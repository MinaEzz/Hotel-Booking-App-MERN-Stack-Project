import express from "express";
import {
  loginSendOtp,
  register,
  verifyOtpAndLogin,
} from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../utils/validations/auth/register.validation";
import { loginSchema } from "../utils/validations/auth/login.validation";
const router = express.Router();

// REGISTER
router.route("/register").post(validate(registerSchema), register);

// LOGIN
router.route("/login").post(validate(loginSchema), loginSendOtp);

// VERIFY OTP
router.route("/verify-otp").post(verifyOtpAndLogin);

// GET LOGGED IN USER

// LOGOUT

// FORGOT PASSWORD

// RESET PASSWORD

export default router;
