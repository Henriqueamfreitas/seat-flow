import { z } from "zod";

export const createReservationSchema = z.object({
  userId: z.string().uuid(),
  seatId: z.number(),
});