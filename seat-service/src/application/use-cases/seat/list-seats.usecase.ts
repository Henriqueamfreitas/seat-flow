import { ISeatRepository } from "../../../domain/repositories/seat.repository";

export class ListSeatsUseCase {
  constructor(private repo: ISeatRepository) {}

  execute() {
    return this.repo.findAll();
  }
}