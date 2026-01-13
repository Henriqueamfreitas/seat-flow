import { z } from "zod";

export const activateUserSchema = z.object({
  id: z.string().uuid("Invalid user id"),
});
