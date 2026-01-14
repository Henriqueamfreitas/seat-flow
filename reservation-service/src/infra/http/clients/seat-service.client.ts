import axios from "axios";

export class SeatServiceClient {
  async reserveSeat(seatId: number) {
    await axios.post(
      `http://seat-service:3003/${seatId}/reserve`
      // `http://seat-service:3003/seats/${seatId}/reserve`
      // `http://user-service:3000/internal/by-email/${email}`

    );
  }

  async releaseSeat(seatId: number) {
    await axios.post(
      `http://seat-service:3003/seats/${seatId}/release`
    );
  }
}