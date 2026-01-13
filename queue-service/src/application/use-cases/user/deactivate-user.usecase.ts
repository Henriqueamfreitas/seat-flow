import { IdNotFoundError } from "../../../domain/errors/user/IdNotFoundError";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { IDeactivateUserInputDTO } from "../../dtos/user/deactivate-user.dto";

export class DeactivateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IDeactivateUserInputDTO): Promise<void> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new IdNotFoundError();
    }

    await this.userRepository.deactivate(data.id);
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