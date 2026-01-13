import { Request, Response } from "express";
import { seatIdSchema } from "../../validators/seat/seat-id.schema";
import { SeatRepository } from "../../../db/typeorm/repositories/seat.repository";
import { ReleaseSeatUseCase } from "../../../../application/use-cases/seat/release-seat.usecase";

export class ReleaseSeatController {
  async handle(req: Request, res: Response) {
    const { id } = seatIdSchema.parse(req.params);

    const repo = new SeatRepository();
    const useCase = new ReleaseSeatUseCase(repo);

    const seat = await useCase.execute(id);

    return res.status(200).json(seat);
  }
}