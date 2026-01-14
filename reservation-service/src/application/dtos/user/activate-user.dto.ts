import { SafeUser } from "../../../domain/entities/reservation.entity";

export interface IActivateUserInputDTO {
  id: string,
}

export type IActivateUserOutputDTO = SafeUser;


/*
Shape of input

Shape of output

No logic

No database

No HTTP
*/