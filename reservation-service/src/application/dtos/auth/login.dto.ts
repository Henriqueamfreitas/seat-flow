import { SafeUser } from "../../../domain/entities/reservation.entity";

export interface ILoginInputDTO {
  email: string;
  password: string;
}

export interface ILoginOutputDTO {
  user: SafeUser;
  token: string;
}
