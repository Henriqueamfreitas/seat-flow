import { consume } from "../infra/rabbitmq/consumer";
import { SeatServiceClient } from "../services/seat.service.client";

const seatService = new SeatServiceClient();

export async function reservationExpiredConsumer() {
  await consume("reservation.expired", async (data) => {
    const { seatId } = data;
    await seatService.release(seatId);
  });
}