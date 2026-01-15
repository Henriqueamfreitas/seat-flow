import { IReservationRepository } from "../../../domain/repositories/reservation.repository";
import { SeatServiceClient } from "../../../infra/http/clients/seat-service.client";
import { ReservationStatus } from "../../../domain/enums/reservation-status.enum";

export class CancelReservationUseCase {
  constructor(
    private reservationRepo: IReservationRepository,
    private seatService: SeatServiceClient
  ) {}

  async execute(reservationId: number): Promise<void> {
    const reservation = await this.reservationRepo.findById(reservationId);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    if (reservation.status !== ReservationStatus.ACTIVE) {
      throw new Error("Reservation already cancelled or expired");
    }

    await this.seatService.releaseSeat(reservation.seatId);

    reservation.cancel();

    await this.reservationRepo.save(reservation);
  }
}