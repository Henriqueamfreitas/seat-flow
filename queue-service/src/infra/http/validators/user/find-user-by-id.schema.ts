import { z } from "zod";

export const findUserByIdSchema = z.object({
  id: z.string().uuid("Invalid user id"),
});
