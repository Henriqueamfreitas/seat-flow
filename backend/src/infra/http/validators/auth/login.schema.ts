import { z } from "zod";

export const loginSchema = z.object({
  email: z.string({ message: "Email is required" }).email("Email must be valid"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});
