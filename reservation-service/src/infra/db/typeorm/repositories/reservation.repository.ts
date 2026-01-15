import { Reservation } from "../../../../domain/entities/reservation.entity";
import { ReservationStatus } from "../../../../domain/enums/reservation-status.enum";
import { IReservationRepository } from "../../../../domain/repositories/reservation.repository";
import { AppDataSource } from "../database";
import { ReservationEntity } from "../entities/reservation.entity";
import { ReservationMapper } from "../mappers/reservation.mapper";

export class ReservationRepository
  implements IReservationRepository {
  private repo = AppDataSource.getRepository(ReservationEntity);

  async create(data: Reservation): Promise<Reservation> {
    const orm = ReservationMapper.toOrm(data);

    const saved = await this.repo.save(orm);

    return ReservationMapper.toDomain(saved);
  }

  async findActiveBySeatId(seatId: number): Promise<Reservation | null> {
    const found = await this.repo.findOne({
      where: { seatId, status: ReservationStatus.ACTIVE },
    });

    return found ? ReservationMapper.toDomain(found) : null;
  }

  async findById(id: number): Promise<Reservation | null> {
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
  
  async list(filters: { userId?: string; status?: string }) {
    const qb = this.repo.createQueryBuilder("r");

    if (filters.userId) {
      qb.andWhere("r.userId = :userId", { userId: filters.userId });
    }

    if (filters.status) {
      qb.andWhere("r.status = :status", { status: filters.status });
    }

    const result = await qb.getMany();
    return result.map(ReservationMapper.toDomain);
  }
}