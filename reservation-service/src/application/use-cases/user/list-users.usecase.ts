import { SafeUser } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { IListUsersInputDTO, IListUsersOutputDTO } from "../../dtos/user/list-users.dto";

export class ListUsersUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IListUsersInputDTO): Promise<IListUsersOutputDTO> {
    const { users, total } = await this.userRepository.findAll(data)

    const safeUsers = users?.map(user => removePassword(user) as SafeUser)

    return {
      data: safeUsers, meta: {
        page: Number(data.page ?? 1),
        perPage: Number(data.perPage ?? 10),
        total,
        totalPages: Math.ceil(total / (data.perPage ?? 10)),
      }
    }
  }
}

/*
Orchestrates the business flow

Calls repositories

Applies business rules

Decides what goes into the response

Converts entities → safe output

🧠 “This is the brain.”
*/