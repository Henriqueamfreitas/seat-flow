import { IReservationRepository } from "../../../domain/repositories/reservation.repository";
import { Reservation } from "../../../domain/entities/reservation.entity";

interface IRequest {
  userId?: string;
  status?: string;
}

export class ListReservationsUseCase {
  constructor(private reservationRepo: IReservationRepository) {}

  async execute(filters: IRequest): Promise<Reservation[]> {
    return this.reservationRepo.list(filters);
  }
}