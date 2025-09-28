import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(1, "Identifier required"),
  password: z.string().min(1, "Password required"),
});

export const verifyOtpSchema = z.object({
  identifier: z.string().min(1, "Identifier required"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
