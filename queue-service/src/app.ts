import "dotenv/config";

import { reservationCreatedConsumer } from "./consumers/reservation-created.consumer";
import { reservationCanceledConsumer } from "./consumers/reservation-canceled.consumer";
import { reservationExpiredConsumer } from "./consumers/reservation-expired.consumer";
import { userDeactivatedConsumer } from "./consumers/user-deactivated.consumer";

async function bootstrap() {
  console.log("🚀 Queue service started");

  await reservationCreatedConsumer();
  await reservationCanceledConsumer();
  await reservationExpiredConsumer();
  await userDeactivatedConsumer();
}

bootstrap();