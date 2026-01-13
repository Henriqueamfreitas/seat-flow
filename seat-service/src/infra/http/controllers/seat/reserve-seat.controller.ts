import { Request, Response } from "express";
import { seatIdSchema } from "../../validators/seat/seat-id.schema";
import { SeatRepository } from "../../../db/typeorm/repositories/seat.repository";
import { ReserveSeatUseCase } from "../../../../application/use-cases/seat/reserve-seat.usecase";

export class ReserveSeatController {
  async handle(req: Request, res: Response) {
    const { id } = seatIdSchema.parse(req.params);

    const repo = new SeatRepository();
    const useCase = new ReserveSeatUseCase(repo);

    const seat = await useCase.execute(id);

    return res.status(200).json(seat);
  }
}