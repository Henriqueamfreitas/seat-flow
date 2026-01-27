import { consume } from "../infra/rabbitmq/consumer";
import { SeatServiceClient } from "../services/seat.service.client";

const seatService = new SeatServiceClient();

export async function reservationCreatedConsumer() {
  await consume("reservation.created", async (data) => {
    const { seatId } = data;
    await seatService.reserve(seatId);
  });
}