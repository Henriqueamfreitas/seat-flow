import axios from "axios";

export class ReservationServiceClient {
  async expire(reservationId: number) {
    await axios.post(
      `http://reservation-service:3004/reservations/${reservationId}/expire`
    );
  }
}