import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { createUserSchema } from "../../validators/user/create-user.schema";
import { CreateUserUseCase } from "../../../../application/use-cases/user/create-user.usecase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const data = createUserSchema.parse(req.body);
    
    const useCase = new CreateUserUseCase(new UserRepository());

    const result = await useCase.execute(data);

    return res.status(201).json(result);
  }
}
