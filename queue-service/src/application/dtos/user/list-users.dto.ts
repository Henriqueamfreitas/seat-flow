import { SafeUser } from "../../../domain/entities/user";
import { PaginatedResponseDTO } from "../pagination/paginated-response.dto";

export interface IListUsersInputDTO {
  name?: string,
  email?: string,
  role?: "admin" | "employee",
  page?: number,
  perPage?: number,
}

export type IListUsersOutputDTO = PaginatedResponseDTO<SafeUser>;

/*
Shape of input

Shape of output

No logic

No database

No HTTP
*/