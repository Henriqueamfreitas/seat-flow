import { z } from "zod";
import { ICreateUserInputDTO } from "../../../../application/dtos/user/create-user.dto";

export const createUserSchema: z.ZodSchema<ICreateUserInputDTO> = z.object({
  name: z.string({ message: "Name is required" }).min(1, "Name cannot be empty"),

  email: z.string({ message: "Email is required" }).email("Email must be valid"),

  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters"),
});
