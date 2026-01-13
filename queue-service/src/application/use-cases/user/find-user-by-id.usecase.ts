import { IUserRepository } from "../../../domain/repositories/user.repository";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { IFindUserByIdInputDTO, IFindUserByIdOutputDTO } from "../../dtos/user/find-user-by-id.dto";
import { IdNotFoundError } from "../../../domain/errors/user/IdNotFoundError";

export class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: IFindUserByIdInputDTO): Promise<IFindUserByIdOutputDTO> {
    const user = await this.userRepository.findById(data.id);
    if (!user) {
      throw new IdNotFoundError();
    }

    return removePassword(user)
  }
}
