import { Reservation } from "../../../../domain/entities/reservation.entity";
import { ReservationEntity } from "../entities/reservation.entity";

export class ReservationMapper {
  static toDomain(entity: ReservationEntity): Reservation {
    return Reservation.restore({
      id: entity.id,
      seatId: entity.seatId,
      userId: entity.userId,
      status: entity.status,
      expiresAt: entity.expiresAt,
      createdAt: entity.createdAt,
    } as Reservation);
  }

  static toOrm(domain: Reservation): ReservationEntity {
    const entity = new ReservationEntity();

    entity.id = domain.id;
    entity.seatId = domain.seatId;
    entity.userId = domain.userId;
    entity.status = domain.status;
    entity.expiresAt = domain.expiresAt;
    entity.createdAt = domain.createdAt;

    return entity;
  }
}