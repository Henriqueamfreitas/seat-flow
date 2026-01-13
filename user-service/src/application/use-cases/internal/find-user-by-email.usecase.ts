import { IUserRepository } from "../../../domain/repositories/user.repository";
import { EmailNotFoundError } from "../../../domain/errors/user/EmailNotFoundError";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { IFindUserByEmailInputDTO, IFindUserByEmailOutputDTO } from "../../dtos/internal/find-user-by-email.dto";

export class FindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IFindUserByEmailInputDTO): Promise<IFindUserByEmailOutputDTO> {
    const user = await this.userRepository.findByEmail(data.email);
    
    if (!user) {
      throw new EmailNotFoundError();
    }

    return user
  }
}
