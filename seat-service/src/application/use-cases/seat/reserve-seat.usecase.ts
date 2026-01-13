import { SeatStatus } from "../../../domain/enums/seat-status.enum";
import { ISeatRepository } from "../../../domain/repositories/seat.repository";

export class ReserveSeatUseCase {
  constructor(private repo: ISeatRepository) {}

  async execute(seatId: number) {
    const seat = await this.repo.findById(seatId);

    if (!seat || seat.status !== "FREE") {
      throw new Error("Seat not available");
    }

    seat.status = SeatStatus.RESERVED;
    return this.repo.save(seat);
  }
}
