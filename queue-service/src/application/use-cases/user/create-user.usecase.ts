import { ICreateUserInputDTO, ICreateUserOutputDTO } from "../../dtos/user/create-user.dto";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import bcrypt from "bcryptjs";
import { EmailAlreadyExistsError } from "../../../domain/errors/user/EmailAlreadyExistsError";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) { }

  async execute(data: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    const exists = await this.userRepository.findByEmail(data.email);
    if (exists) {
      throw new EmailAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.userRepository.create({
      ...data,
      password: hashedPassword,
    });

    return removePassword(newUser);
  }
}
