import { SafeUser } from "../../../domain/entities/user";

export interface ILoginInputDTO {
  email: string;
  password: string;
}

export interface ILoginOutputDTO {
  user: SafeUser;
  token: string;
}
