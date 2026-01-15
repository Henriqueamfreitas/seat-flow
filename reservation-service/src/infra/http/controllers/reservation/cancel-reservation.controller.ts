import { Request, Response } from "express";
import { cancelReservationParamsSchema } from "../../validators/reservation/cancel-reservation.schema";
import { CancelReservationUseCase } from "../../../../application/use-cases/reservation/cancel-reservation.usecase";
import { ReservationRepository } from "../../../db/typeorm/repositories/reservation.repository";
import { SeatServiceClient } from "../../clients/seat-service.client";

export class CancelReservationController {
  async handle(req: Request, res: Response) {
    const { id } = cancelReservationParamsSchema.parse(req.params);

    const useCase = new CancelReservationUseCase(
      new ReservationRepository(),
      new SeatServiceClient()
    );

    await useCase.execute(id);

    return res.status(204).send();
  }
}