import { z } from "zod";

/**
 * Password policy:
 * - at least 6 characters
 * - at least 1 lowercase, 1 uppercase, 1 digit, 1 special char
 */
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/;

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username must be less than 50 characters"),
    email: z
      .string()
      .email("Invalid email address")
      .min(3, "Email must be at least 3 characters")
      .max(50, "Email must be less than 50 characters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    // .regex(
    //   passwordRegex,
    //   "Password must contain uppercase, lowercase, number and special character"
    // ),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password must be less than 50 characters"),
    // .regex(
    //   passwordRegex,
    //   "Password must contain uppercase, lowercase, number and special character"
    // ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
