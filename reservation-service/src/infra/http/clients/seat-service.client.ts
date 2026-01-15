import axios from "axios";

export class SeatServiceClient {
  async reserveSeat(seatId: number) {

    await axios.post(
      `http://seat-service:3003/${seatId}/reserve`
    );
  }

  async releaseSeat(seatId: number) {
    await axios.post(
      `http://seat-service:3003/${seatId}/release`
    );

  }
}