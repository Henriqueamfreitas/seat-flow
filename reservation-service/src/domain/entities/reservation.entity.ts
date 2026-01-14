import { ReservationStatus } from "../enums/reservation-status.enum";

interface CreateReservationProps {
  seatId: number;
  userId: string;
  expiresAt: Date;
}

export class Reservation {
  id!: number;
  seatId!: number;
  userId!: string;
  status!: ReservationStatus;
  expiresAt!: Date;
  createdAt!: Date;

  private constructor() {}

  static create(props: {
    seatId: number;
    userId: string;
    expiresAt: Date;
  }): Reservation {
    const reservation = new Reservation();

    reservation.seatId = props.seatId;
    reservation.userId = props.userId;
    reservation.expiresAt = props.expiresAt;
    reservation.status = ReservationStatus.ACTIVE;
    reservation.createdAt = new Date();

    return reservation;
  }

  /** 🔑 Used ONLY by mappers / repositories */
  static restore(props: Reservation): Reservation {
    const reservation = new Reservation();

    Object.assign(reservation, props);

    return reservation;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  expire() {
    this.status = ReservationStatus.EXPIRED;
  }
}