import { SeatStatus } from "../enums/seat-status.enum";

export class Seat {
  id!: number;
  code!: string;
  status!: SeatStatus;
  createdAt!: Date;
}
