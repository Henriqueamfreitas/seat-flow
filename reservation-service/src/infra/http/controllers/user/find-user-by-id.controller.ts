import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { FindUserByIdUseCase } from "../../../../application/use-cases/user/find-user-by-id.usecase";
import { findUserByIdSchema } from "../../validators/user/find-user-by-id.schema";

export class FindUserByIdController {
  async handle(req: Request, res: Response) {
    const data = findUserByIdSchema.parse(req.params);

    const useCase = new FindUserByIdUseCase(new UserRepository());

    const result = await useCase.execute(data);

    return res.status(200).json(result);
  }
}
