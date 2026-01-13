import { z } from "zod";

export const listUsersSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.enum(["admin", "employee"]).optional(),
  page: z.preprocess(
    (value) => {
      if (value === undefined) return undefined;
      return Number(value);
    },
    z.number().int().min(0).optional()
  ),

  perPage: z.preprocess(
    (value) => {
      if (value === undefined) return undefined;
      return Number(value);
    },
    z.number().int().min(1).max(100).optional()
  ),
});
