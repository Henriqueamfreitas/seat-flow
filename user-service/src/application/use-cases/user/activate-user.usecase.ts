import { IdNotFoundError } from "../../../domain/errors/user/IdNotFoundError";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { IActivateUserInputDTO, IActivateUserOutputDTO } from "../../dtos/user/activate-user.dto";

export class ActivateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IActivateUserInputDTO): Promise<IActivateUserOutputDTO> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new IdNotFoundError();
    }

    const updatedUser = await this.userRepository.activate(data.id);

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