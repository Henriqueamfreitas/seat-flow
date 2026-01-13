import { SafeUser } from "../../../domain/entities/user";
import { IdNotFoundError } from "../../../domain/errors/user/IdNotFoundError";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { IUpdateUserInputDTO, IUpdateUserOutputDTO } from "../../dtos/user/update-user.dto";

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IUpdateUserInputDTO): Promise<IUpdateUserOutputDTO> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new IdNotFoundError();
    }

    const updatedUser = await this.userRepository.update(data);

    const safeUser = removePassword(updatedUser!)

    return safeUser
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