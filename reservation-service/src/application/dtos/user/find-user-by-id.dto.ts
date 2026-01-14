import { SafeUser } from "../../../domain/entities/reservation.entity";

export interface IFindUserByIdInputDTO {
  id: string;
}

export type IFindUserByIdOutputDTO = SafeUser
