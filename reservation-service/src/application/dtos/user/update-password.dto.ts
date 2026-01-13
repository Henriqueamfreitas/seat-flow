import { SafeUser } from "../../../domain/entities/user";
import { PaginatedResponseDTO } from "../pagination/paginated-response.dto";

export interface IUpdatePasswordInputDTO {
  id: string,
  password: string,
}

export type IUpdatePasswordOutputDTO = SafeUser;

/*
Shape of input

Shape of output

No logic

No database

No HTTP
*/