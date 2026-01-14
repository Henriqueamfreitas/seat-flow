import { Request, Response } from "express";
import { CreateReservationUseCase } from "../../../../application/use-cases/reservation/create-reservation.usecase";
import { ReservationRepository } from "../../../db/typeorm/repositories/reservation.repository";
import { createReservationSchema } from "../../validators/reservation/create-reservation.schema";
import { SeatServiceClient } from "../../clients/seat-service.client";

export class CreateReservationController {
  async handle(req: Request, res: Response) {
    const { seatId, userId, expiresInMinutes } = req.body;

    
    const expiresAt = new Date(
      Date.now() + Number(expiresInMinutes ?? 15) * 60 * 1000
    );
    const reservationRepo = new ReservationRepository();
    const seatService = new SeatServiceClient();

    const useCase = new CreateReservationUseCase(
      reservationRepo,
      seatService
    );

    const reservation = await useCase.execute({
      seatId,
      userId,
      expiresAt: new Date(expiresAt),
    });

    return res.status(201).json(reservation);
  }
}
