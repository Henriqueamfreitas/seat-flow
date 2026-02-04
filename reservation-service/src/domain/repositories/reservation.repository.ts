import { Reservation } from "../entities/reservation.entity";

export interface IReservationRepository {
  create(data: Reservation): Promise<Reservation>;
  findActiveBySeatId(seatId: number): Promise<Reservation | null>;
  findById(id: number): Promise<Reservation | null>;
  save(reservation: Reservation): Promise<Reservation>;
  list(filters: {
    userId?: string;
    status?: string;
  }): Promise<Reservation[]>;
  updateById(id: number, payload: Partial<Reservation>): Promise<"ok" | null>;
}