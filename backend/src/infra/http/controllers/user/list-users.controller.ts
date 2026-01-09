import { Request, Response } from "express";
import { UserRepository } from "../../../db/typeorm/repositories/user.repository";
import { listUsersSchema } from "../../validators/user/list-users.schema";
import { ListUsersUseCase } from "../../../../application/use-cases/user/list-users.usecase";

export class ListUsersController {
  async handle(req: Request, res: Response) {
    const data = listUsersSchema.parse(req.query);

    const useCase = new ListUsersUseCase(new UserRepository());

    const result = await useCase.execute(data);

    return res.status(200).json(result);
  }
}
