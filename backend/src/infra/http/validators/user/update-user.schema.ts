import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  role: z.enum(["admin", "employee"]).optional(),
});
