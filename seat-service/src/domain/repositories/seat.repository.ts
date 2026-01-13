import { Seat } from "../entities/seat";

export interface ISeatRepository {
  create(seat: Partial<Seat>): Promise<Seat>;
  findAll(): Promise<Seat[]>;
  findById(id: number): Promise<Seat | null>;
  save(seat: Seat): Promise<Seat>;
}
