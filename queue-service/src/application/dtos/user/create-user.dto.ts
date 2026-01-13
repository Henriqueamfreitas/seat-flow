import { SafeUser } from "../../../domain/entities/user";

export interface ICreateUserInputDTO {
  name: string;
  email: string;
  password: string;
}

export type ICreateUserOutputDTO = SafeUser
