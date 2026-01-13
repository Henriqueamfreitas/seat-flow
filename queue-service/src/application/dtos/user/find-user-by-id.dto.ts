import { SafeUser } from "../../../domain/entities/user";

export interface IFindUserByIdInputDTO {
  id: string;
}

export type IFindUserByIdOutputDTO = SafeUser
