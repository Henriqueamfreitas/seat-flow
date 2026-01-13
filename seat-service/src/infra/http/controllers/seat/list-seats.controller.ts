import { Request, Response } from "express";
import { SeatRepository } from "../../../db/typeorm/repositories/seat.repository";
import { ListSeatsUseCase } from "../../../../application/use-cases/seat/list-seats.usecase";

export class ListSeatsController {
  async handle(_req: Request, res: Response) {
    const repo = new SeatRepository();
    const useCase = new ListSeatsUseCase(repo);

    const seats = await useCase.execute();

    return res.status(200).json(seats);
  }
}