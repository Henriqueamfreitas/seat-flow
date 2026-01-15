import { z } from "zod";

export const listReservationsQuerySchema = z.object({
  userId: z.string().uuid().optional(),
  status: z.string().optional(),
});