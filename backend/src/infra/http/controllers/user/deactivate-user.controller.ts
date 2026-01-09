import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { deactivateUserSchema } from "../../validators/user/deactivate-user.schema";
import { DeactivateUserUseCase } from "../../../../application/use-cases/user/deactivate-user.usecase";

export class DeactivateUserController {
  async handle(req: Request, res: Response) {
    const data = deactivateUserSchema.parse(req.params);

    const useCase = new DeactivateUserUseCase(new UserRepository());

    await useCase.execute(data);

    return res.status(204).send();
  }
}
