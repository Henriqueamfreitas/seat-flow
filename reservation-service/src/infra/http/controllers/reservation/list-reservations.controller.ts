import { Request, Response } from "express";
import { listReservationsQuerySchema } from "../../validators/reservation/list-reservations.schema";
import { ListReservationsUseCase } from "../../../../application/use-cases/reservation/list-reservations.usecase";
import { ReservationRepository } from "../../../db/typeorm/repositories/reservation.repository";

export class ListReservationsController {
  async handle(req: Request, res: Response) {
    const filters = listReservationsQuerySchema.parse(req.query);

    const useCase = new ListReservationsUseCase(
      new ReservationRepository()
    );

    const reservations = await useCase.execute(filters);

    return res.json(reservations);
  }
}