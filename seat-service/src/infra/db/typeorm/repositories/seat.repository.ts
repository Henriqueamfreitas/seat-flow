import { Repository } from "typeorm";
import { ISeatRepository } from "../../../../domain/repositories/seat.repository";
import { AppDataSource } from "../database";
import { SeatORM } from "../entities/seat.entity";

export class SeatRepository implements ISeatRepository {
  private repo: Repository<SeatORM>;

  constructor() {
    this.repo = AppDataSource.getRepository(SeatORM);
  }

  create(data: Partial<SeatORM>) {
    const seat = this.repo.create(data);
    return this.repo.save(seat);
  }

  findAll() {
    return this.repo.find();
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  save(seat: SeatORM) {
    return this.repo.save(seat);
  }
}