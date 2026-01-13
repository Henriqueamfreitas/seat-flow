import { SeatStatus } from "../../../domain/enums/seat-status.enum";
import { ISeatRepository } from "../../../domain/repositories/seat.repository";

export class ReleaseSeatUseCase {
  constructor(private repo: ISeatRepository) {}

  async execute(seatId: number) {
    const seat = await this.repo.findById(seatId);

    if (!seat) {
      throw new Error("Seat not found");
    }

    seat.status = SeatStatus.FREE;
    return this.repo.save(seat);
  }
}
