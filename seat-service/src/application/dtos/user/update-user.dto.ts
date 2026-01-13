import { SafeUser } from "../../../domain/entities/user";
import { PaginatedResponseDTO } from "../pagination/paginated-response.dto";

export interface IUpdateUserInputDTO {
  id: string,
  name?: string,
  email?: string,
  role?: "admin" | "employee",
}

export type IUpdateUserOutputDTO = SafeUser;

/*
Shape of input

Shape of output

No logic

No database

No HTTP
*/