import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { loginSchema } from "../../validators/auth/login.schema";
import { LoginUseCase } from "../../../../application/use-cases/auth/login.usecase";

export class LoginController {
  async handle(req: Request, res: Response) {
    const data = loginSchema.parse(req.body);

    const useCase = new LoginUseCase(new UserRepository());

    const result = await useCase.execute(data);

    return res.status(200).json(result);
  }
}
