import { IUserRepository } from "../../../domain/repositories/user.repository";
import { SafeUser } from "../../../domain/entities/user";
import { EmailNotFoundError } from "../../../domain/errors/user/EmailNotFoundError";
import { IFindUserByEmailInputDTO, IFindUserByEmailOutputDTO } from "../../dtos/user/find-user-by-email.dto";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";

export class FindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IFindUserByEmailInputDTO): Promise<IFindUserByEmailOutputDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    
    if (!user) {
      throw new EmailNotFoundError();
    }

    return removePassword(user)
  }
}
