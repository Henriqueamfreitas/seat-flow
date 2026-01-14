import { Reservation } from "../../../domain/entities/reservation.entity";
import { IReservationRepository } from "../../../domain/repositories/reservation.repository";
import { SeatServiceClient } from "../../../infra/http/clients/seat-service.client";

interface IRequest {
  seatId: number;
  userId: string;
  expiresAt: Date;
}

export class CreateReservationUseCase {
  constructor(
    private reservationRepo: IReservationRepository,
    private seatService: SeatServiceClient
  ) {}

  async execute({ seatId, userId, expiresAt }: IRequest): Promise<Reservation> {
    // 1️⃣ Reserve seat in Seat Service
    await this.seatService.reserveSeat(seatId);

    // 2️⃣ Create domain entity
    const reservation = Reservation.create({
      seatId,
      userId,
      expiresAt,
    });

    // 3️⃣ Persist entity
    return await this.reservationRepo.create(reservation);
  }
}
