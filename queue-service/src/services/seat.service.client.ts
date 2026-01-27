import axios from "axios";

export class SeatServiceClient {
  async reserve(seatId: number) {
    await axios.post(
      `http://seat-service:3003/seats/${seatId}/reserve`
    );
  }

  async release(seatId: number) {
    await axios.post(
      `http://seat-service:3003/seats/${seatId}/release`
    );
  }
}