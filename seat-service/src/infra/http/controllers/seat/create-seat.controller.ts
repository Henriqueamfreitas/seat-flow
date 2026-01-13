import { Request, Response } from "express";
import { createSeatSchema } from "../../validators/seat/create-seat.schema";
import { SeatRepository } from "../../../db/typeorm/repositories/seat.repository";
import { CreateSeatUseCase } from "../../../../application/use-cases/seat/create-seat.usecase";

export class CreateSeatController {
  async handle(req: Request, res: Response) {
    const data = createSeatSchema.parse(req.body);

    const repo = new SeatRepository();
    const useCase = new CreateSeatUseCase(repo);

    const seat = await useCase.execute(data.code);

    return res.status(201).json(seat);
  }
}