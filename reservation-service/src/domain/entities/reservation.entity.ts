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

  private constructor() { }

  static create(props: {
    seatId: number;
    userId: string;
    expiresAt: Date;
  }): Reservation {
    if (props.expiresAt <= new Date()) {
      throw new Error("Expiration date must be in the future");
    }
    const reservation = new Reservation();

    reservation.seatId = props.seatId;
    reservation.userId = props.userId;
    reservation.expiresAt = props.expiresAt;
    reservation.status = ReservationStatus.PENDING;
    reservation.createdAt = new Date();

    return reservation;
  }

  /** 🔑 Used ONLY by mappers / repositories */
  static restore(props: Reservation): Reservation {
    const reservation = new Reservation();

    Object.assign(reservation, props);

    return reservation;
  }

  cancel() {
    if (![ReservationStatus.ACTIVE, ReservationStatus.PENDING].includes(this.status)) {
      throw new Error("Only active or pending reservations can be cancelled");
    }


    this.status = ReservationStatus.CANECELLED;
  }

  isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  expire() {
    if (this.status !== ReservationStatus.PENDING) return;
    this.status = ReservationStatus.EXPIRED;
  }

  activate() {
    if (this.status !== ReservationStatus.PENDING) {
      throw new Error("Only pending reservations can be activated");
    }
    this.status = ReservationStatus.ACTIVE;
  }

  reject() {
    if (this.status !== ReservationStatus.PENDING) {
      throw new Error("Only pending reservations can be rejected");
    }
    this.status = ReservationStatus.REJECTED;
  }

}


