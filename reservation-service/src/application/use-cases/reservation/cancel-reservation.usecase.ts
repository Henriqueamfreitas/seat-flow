import { ReservationStatus } from "../../../domain/enums/reservation-status.enum";
import { IReservationRepository } from "../../../domain/repositories/reservation.repository";

export class CancelReservationUseCase {
  constructor(
    private reservationRepo: IReservationRepository
  ) {}

  async execute(id: string) {
    const reservation = await this.reservationRepo.findById(id);

    if (!reservation) {
      throw new Error("Reservation not found");
    }

    reservation.status = ReservationStatus.CANCELED;
    await this.reservationRepo.save(reservation);
  }
}