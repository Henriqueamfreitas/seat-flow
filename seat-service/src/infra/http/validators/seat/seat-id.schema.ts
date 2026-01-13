import { z } from "zod";

export const seatIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});