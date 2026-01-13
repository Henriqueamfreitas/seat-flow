import { ISeatRepository } from "../../../domain/repositories/seat.repository";

export class CreateSeatUseCase {
  constructor(private repo: ISeatRepository) {}

  execute(code: string) {
    return this.repo.create({ code });
  }
}