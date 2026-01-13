import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { activateUserSchema } from "../../validators/user/activate-user.schema";
import { ActivateUserUseCase } from "../../../../application/use-cases/user/activate-user.usecase";

export class ActivateUserController {
  async handle(req: Request, res: Response) {
    const data = activateUserSchema.parse(req.params);

    const useCase = new ActivateUserUseCase(new UserRepository());

    const updatedUser = await useCase.execute(data);

    return res.status(200).json(updatedUser);
  }
}
