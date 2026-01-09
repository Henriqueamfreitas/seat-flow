import { z } from "zod";

export const deactivateUserSchema = z.object({
  id: z.string().uuid("Invalid user id"),
});
