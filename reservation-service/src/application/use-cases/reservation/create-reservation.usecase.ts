import { Reservation } from "../../../domain/entities/reservation.entity";
import { IReservationRepository } from "../../../domain/repositories/reservation.repository";
import { QueueServiceClient } from "../../../infra/http/clients/queue-service.client";
import { ReservationPublisher } from "../../../infra/queue/reservation.publisher";

interface IRequest {
  seatId: number;
  userId: string;
  expiresAt: Date;
}

export class CreateReservationUseCase {
  constructor(
    private reservationRepo: IReservationRepository,
  ) { }

  async execute({ seatId, userId, expiresAt }: IRequest): Promise<Reservation> {
    // 1️⃣ Create reservation
    const reservation = Reservation.create({
      seatId,
      userId,
      expiresAt,
    });

    // 2️⃣ Persist
    const saved = await this.reservationRepo.create(reservation);

    // 3️⃣ Emit event
    try {
      await ReservationPublisher.reservationCreated({
        reservationId: saved.id,
        seatId: saved.seatId,
        userId: saved.userId,
        expiresAt: saved.expiresAt,
      });
    } catch (err) {
      console.error("Failed to publish reservation.created", err);
    }

    return saved;
  }
}
