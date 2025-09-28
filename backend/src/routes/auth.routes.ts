import express from "express";
import {
  getLoggedinUser,
  loginSendOtp,
  logout,
  register,
  verifyOtpAndLogin,
} from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../utils/validations/auth/register.validation";
import {
  loginSchema,
  verifyOtpSchema,
} from "../utils/validations/auth/login.validation";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();

// REGISTER
router.route("/register").post(validate(registerSchema), register);

// LOGIN
router.route("/login").post(validate(loginSchema), loginSendOtp);

// VERIFY OTP
router.route("/verify-otp").post(validate(verifyOtpSchema), verifyOtpAndLogin);

// GET LOGGED IN USER
router.route("/me").get(authMiddleware, getLoggedinUser);

// LOGOUT
router.route("/logout").post(logout);

// FORGOT PASSWORD

// RESET PASSWORD

export default router;
