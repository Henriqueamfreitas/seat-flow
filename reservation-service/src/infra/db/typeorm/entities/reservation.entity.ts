import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ReservationStatus } from "../../../../domain/enums/reservation-status.enum";

@Entity("reservations")
export class ReservationEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  seatId!: number;

  @Column()
  userId!: string;

  @Column({ type: "enum", enum: ReservationStatus })
  status!: ReservationStatus;

  @Column()
  expiresAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;
}
