import { z } from "zod";

export const createSeatSchema = z.object({
  code: z.string().min(1, "Seat code is required"),
});