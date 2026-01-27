import { consume } from "../infra/rabbitmq/consumer";
import { ReservationServiceClient } from "../services/reservation.service.client";

const reservationService = new ReservationServiceClient();

export async function userDeactivatedConsumer() {
  await consume("user.deactivated", async (data) => {
    const { userId } = data;
    console.log(`User ${userId} deactivated → reservations cleanup`);
  });
}