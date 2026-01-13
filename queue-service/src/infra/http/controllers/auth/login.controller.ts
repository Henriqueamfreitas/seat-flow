import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { ActivateUserUseCase } from "../../../../application/use-cases/user/activate-user.usecase";
import { loginSchema } from "../../validators/auth/login.schema";
import { LoginUseCase } from "../../../../application/use-cases/auth/login.usecase";

export class LoginController {
  async handle(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const useCase = new LoginUseCase(new UserRepository());

    const result = await useCase.execute(data);
    console.log(1111 * 3, result)

    return res.status(200).json(result);
  }
}
