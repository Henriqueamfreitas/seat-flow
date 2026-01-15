import { z } from "zod";

export const cancelReservationParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
