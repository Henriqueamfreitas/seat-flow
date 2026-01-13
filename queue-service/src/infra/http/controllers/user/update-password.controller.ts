import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { updatePasswordSchema } from "../../validators/user/update-password.schema";
import { UpdatePasswordUseCase } from "../../../../application/use-cases/user/update-password.usecase";

export class UpdatePasswordController {
  async handle(req: Request, res: Response) {
    const data = updatePasswordSchema.parse(req.body);

    const useCase = new UpdatePasswordUseCase(new UserRepository());

    const completeData = { ...data, id: req.params.id }

    const result = await useCase.execute(completeData);

    return res.status(200).json(result);
  }
}
