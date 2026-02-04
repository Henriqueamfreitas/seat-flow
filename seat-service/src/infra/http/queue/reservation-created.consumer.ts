import { SeatStatus } from "../../../domain/enums/seat-status.enum";
import { SeatRepository } from "../../db/typeorm/repositories/seat.repository";
import { RabbitMQConnection } from "./rabbitmq.connection";
import { SeatEventsPublisher } from "./seat-events.publisher";

interface ReservationCreatedEvent {
  reservationId: number;
  seatId: number;
  userId: string;
  expiresAt: string;
}

export async function reservationCreatedConsumer() {
  const channel = await RabbitMQConnection.getChannel();

  // 1. Exchange
  await channel.assertExchange("reservation", "topic", {
    durable: true,
  });

  // 2. Queue (seat service specific)
  const queueName = "seat.reservation.created";

  const queue = await channel.assertQueue(queueName, {
    durable: true,
  });

  // 3. Bind queue to exchange
  await channel.bindQueue(
    queue.queue,
    "reservation",
    "reservation.created"
  );

  console.log("👂 Seat service listening for reservation.created");

  // 4. Consume messages
  await channel.consume(queue.queue, async (msg) => {
    if (!msg) return;

    try {
      const content = JSON.parse(
        msg.content.toString()
      ) as ReservationCreatedEvent;

      console.log("📩 Received reservation.created", content);

      // 5. Business logic (example)
      // const seatOcuppied = await checkSeatAvailability(content.seatId);
      const seatRepository = new SeatRepository();
      const seatReserved = await seatRepository.reserveSeatIfFree(content.seatId);

      if (seatReserved) {
        await SeatEventsPublisher.reservationApproved({
          reservationId: content.reservationId,
          seatId: content.seatId,
        });
      } else {
        await SeatEventsPublisher.reservationRejected({
          reservationId: content.reservationId,
          seatId: content.seatId,
          reason: "Seat already reserved",
        });
      }




      // 6. ACK message
      channel.ack(msg);
    } catch (error) {
      console.error("❌ Error processing reservation.created", error);

      // Optional: send to DLQ later
      channel.nack(msg, false, false);
    }
  });
}

// Mock logic for now
async function checkSeatAvailability(seatId: number): Promise<boolean> {
  // later: DB check / lock / transaction
  return Math.random() > 0.3;
}
