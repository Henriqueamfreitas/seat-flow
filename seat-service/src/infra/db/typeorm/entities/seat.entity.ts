import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { SeatStatus } from "../../../../domain/enums/seat-status.enum";

@Entity("seats")
export class SeatORM {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  code!: string;

  @Column({
    type: "enum",
    enum: SeatStatus,
    default: SeatStatus.FREE,
  })
  status!: SeatStatus;

  @CreateDateColumn()
  createdAt!: Date;
}
