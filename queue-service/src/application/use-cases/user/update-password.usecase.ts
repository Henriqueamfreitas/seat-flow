import { SafeUser } from "../../../domain/entities/user";
import { IdNotFoundError } from "../../../domain/errors/user/IdNotFoundError";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { IUpdatePasswordInputDTO, IUpdatePasswordOutputDTO } from "../../dtos/user/update-password.dto";
import bcrypt from "bcryptjs";

export class UpdatePasswordUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IUpdatePasswordInputDTO): Promise<IUpdatePasswordOutputDTO> {
    const user = await this.userRepository.findById(data.id);

    if (!user) {
      throw new IdNotFoundError();
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const updatedUser = await this.userRepository.updatePassword(data.id, hashedPassword);

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