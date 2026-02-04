import { RabbitMQConnection } from "./rabbitmq.connection";
import { ReservationRepository } from "../db/typeorm/repositories/reservation.repository";
import { ReservationStatus } from "../../domain/enums/reservation-status.enum";

interface ReservationApprovedEvent {
  reservationId: number;
  seatId: number;
}

interface ReservationRejectedEvent {
  reservationId: number;
  seatId: number;
  reason?: string;
}

export async function reservationStatusConsumer(): Promise<void> {
  const channel = await RabbitMQConnection.getChannel();
  const reservationRepository = new ReservationRepository();

  // 1️⃣ Ensure exchange exists
  await channel.assertExchange("reservation", "topic", {
    durable: true,
  });

  // 2️⃣ Create a queue owned by reservation service
  const queueName = "reservation.status";

  const queue = await channel.assertQueue(queueName, {
    durable: true,
  });

  // 3️⃣ Bind queue to both status events
  await channel.bindQueue(queue.queue, "reservation", "reservation.approved");
  await channel.bindQueue(queue.queue, "reservation", "reservation.rejected");

  console.log("👂 Reservation service listening for reservation status events");

  // 4️⃣ Consume messages
  await channel.consume(queue.queue, async (msg) => {
    if (!msg) return;

    try {
      const routingKey = msg.fields.routingKey;
      const payload = JSON.parse(msg.content.toString());

      console.log(`📩 Received ${routingKey}`, payload);


      if (routingKey === "reservation.approved") {
        const { reservationId } = payload as ReservationApprovedEvent;

        await reservationRepository.updateById(reservationId, { status: ReservationStatus.ACTIVE});
      }

      if (routingKey === "reservation.rejected") {
        const { reservationId } = payload as ReservationRejectedEvent;

        await reservationRepository.updateById(reservationId, { status: ReservationStatus.REJECTED});
      }

      // 5️⃣ Acknowledge message only after DB update
      channel.ack(msg);
    } catch (error) {
      console.error(
        "❌ Error processing reservation status message",
        error
      );

      // Do not requeue to avoid infinite loops
      channel.nack(msg, false, false);
    }
  });
}
