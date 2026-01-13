import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { updateUserSchema } from "../../validators/user/update-user.schema";
import { UpdateUserUseCase } from "../../../../application/use-cases/user/update-user.usecase";

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const data = updateUserSchema.parse(req.body);

    const useCase = new UpdateUserUseCase(new UserRepository());

    const completeData = { ...data, id: req.params.id }

    const result = await useCase.execute(completeData);

    return res.status(200).json(result);
  }
}
