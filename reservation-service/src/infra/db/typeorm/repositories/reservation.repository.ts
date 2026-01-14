import { Reservation } from "../../../../domain/entities/reservation.entity";
import { ReservationStatus } from "../../../../domain/enums/reservation-status.enum";
import { IReservationRepository } from "../../../../domain/repositories/reservation.repository";
import { AppDataSource } from "../database";
import { ReservationEntity } from "../entities/reservation.entity";
import { ReservationMapper } from "../mappers/reservation.mapper";

export class ReservationRepository
  implements IReservationRepository
{
  private repo = AppDataSource.getRepository(ReservationEntity);

  async create(data: Reservation): Promise<Reservation> {
    console.log(4444, data)
    const orm = ReservationMapper.toOrm(data);
    console.log(55555)

    const saved = await this.repo.save(orm);
    console.log(66666)

    return ReservationMapper.toDomain(saved);
  }

  async findActiveBySeatId(seatId: number): Promise<Reservation | null> {
    const found = await this.repo.findOne({
      where: { seatId, status: ReservationStatus.ACTIVE },
    });

    return found ? ReservationMapper.toDomain(found) : null;
  }

  async findById(id: string): Promise<Reservation | null> {
    const found = await this.repo.findOne({
      where: { id: Number(id) },
    });

    return found ? ReservationMapper.toDomain(found) : null;
  }

  async save(reservation: Reservation): Promise<Reservation> {
    const orm = ReservationMapper.toOrm(reservation);
    const saved = await this.repo.save(orm);
    return ReservationMapper.toDomain(saved);
  }
}