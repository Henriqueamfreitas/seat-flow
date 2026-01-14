import { SafeUser } from "../../../domain/entities/reservation.entity";

export interface IFindUserByEmailInputDTO {
  email: string;
}

export type IFindUserByEmailOutputDTO = SafeUser
