import express from "express";
import {
  forgotPassword,
  getLoggedinUser,
  loginSendOtp,
  logout,
  register,
  resetPassword,
  verifyOtp,
  verifyOtpAndLogin,
} from "../controllers/auth.controllers";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../utils/validations/auth/register.validation";
import {
  loginSchema,
  verifyOtpSchema,
} from "../utils/validations/auth/login.validation";
import { authMiddleware } from "../middlewares/auth.middleware";
import { forgotPasswordSchema } from "../utils/validations/password/forgotPassword.validation";
import { resetPasswordSchema } from "../utils/validations/password/resetPassword.validation";
const router = express.Router();

// REGISTER
router.route("/register").post(validate(registerSchema), register);

// LOGIN
router.route("/login").post(validate(loginSchema), loginSendOtp);

// VERIFY OTP AND LOGIN
router
  .route("/verify-otp-and-login")
  .post(validate(verifyOtpSchema), verifyOtpAndLogin);

// GET LOGGED IN USER
router.route("/me").get(authMiddleware, getLoggedinUser);

// LOGOUT
router.route("/logout").post(logout);

// FORGOT PASSWORD
router
  .route("/forgot-password")
  .post(validate(forgotPasswordSchema), forgotPassword);

// VERIFY OTP
router.route("/verify-otp").post(validate(verifyOtpSchema), verifyOtp);

// RESET PASSWORD
router
  .route("/reset-password")
  .post(validate(resetPasswordSchema), resetPassword);

export default router;
