import { Request, Response } from "express";
import { CreateReservationUseCase } from "../../../../application/use-cases/reservation/create-reservation.usecase";
import { ReservationRepository } from "../../../db/typeorm/repositories/reservation.repository";

export class CreateReservationController {
  async handle(req: Request, res: Response) {
    const { seatId, userId, expiresInMinutes } = req.body;

    const expiresAt = new Date(Date.now() + Number(expiresInMinutes ?? 15) * 60 * 1000);

    const reservationRepo = new ReservationRepository();

    const useCase = new CreateReservationUseCase(reservationRepo);

    const reservation = await useCase.execute({
      seatId,
      userId,
      expiresAt,
    });

    return res.status(201).json(reservation);
  }
}
