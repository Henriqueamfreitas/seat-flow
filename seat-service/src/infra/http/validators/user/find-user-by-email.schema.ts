import { z } from "zod";

export const findUserByEmailSchema = z.object({
  email: z.string().email("Invalid email"),
});
