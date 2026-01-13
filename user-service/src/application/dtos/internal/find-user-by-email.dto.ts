import { SafeUser, User } from "../../../domain/entities/user";

export interface IFindUserByEmailInputDTO {
  email: string;
}

export type IFindUserByEmailOutputDTO = User
