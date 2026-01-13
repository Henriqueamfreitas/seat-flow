import { IUserRepository } from "../../../domain/repositories/user.repository";
import bcrypt from "bcryptjs";
import { removePassword } from "../../../infra/db/typeorm/utils/removePassword";
import { ILoginInputDTO, ILoginOutputDTO } from "../../dtos/auth/login.dto";
import { EmailNotFoundError } from "../../../domain/errors/user/EmailNotFoundError";
import { InvalidCredentialsError } from "../../../domain/errors/user/InvalidCredentialsError";
import jwt from "jsonwebtoken";
import { UserServiceClient } from "../../../infra/http/clients/user-service.client";

export class LoginUseCase {
  constructor(
    private userServiceClient: UserServiceClient
  ) { }

  async execute(data: ILoginInputDTO): Promise<ILoginOutputDTO> {
    const user = await this.userServiceClient.findByEmail(data.email);
    if (!user) {
      throw new EmailNotFoundError();
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign(
      {
        sub: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    delete user.password;

    return {
      user,
      token,
    };
  }
}
