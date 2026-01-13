import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { FindUserByEmailUseCase } from "../../../../application/use-cases/user/find-user-by-email.usecase";
import { findUserByIdSchema } from "../../validators/user/find-user-by-id.schema";
import { findUserByEmailSchema } from "../../validators/user/find-user-by-email.schema";

export class FindUserByEmailController {
  async handle(req: Request, res: Response) {
    const data = findUserByEmailSchema.parse(req.params);
    
    const useCase = new FindUserByEmailUseCase(new UserRepository());

    const result = await useCase.execute(data);

    return res.status(200).json(result);
  }
}
