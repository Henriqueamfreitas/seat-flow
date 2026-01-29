import { ConsumeMessage } from "amqplib";
import { RabbitMQConnection } from "./rabbitmq.connection";
import { SeatRepository } from "../../db/typeorm/repositories/seat.repository";
import { SeatEventsPublisher } from "./seat-events.publisher";

interface ReservationCreatedPayload {
  reservationId: number;
  seatId: number;
  userId: string;
  expiresAt: string;
}

export async function reservationCreatedConsumer() {
  const channel = await RabbitMQConnection.getChannel();

  await channel.assertExchange("reservation", "topic", { durable: true });

  const queue = await channel.assertQueue("seat.reservation.created", {
    durable: true,
  });

  await channel.bindQueue(queue.queue, "reservation", "reservation.created");

  console.log("👂 Seat Service listening to reservation.created");

  const seatRepository = new SeatRepository();

  channel.consume(queue.queue, async (msg: ConsumeMessage | null) => {
    if (!msg) return;

    try {
      const payload: ReservationCreatedPayload = JSON.parse(
        msg.content.toString()
      );

      const seat = await seatRepository.findById(payload.seatId);

      if (!seat) {
        await SeatEventsPublisher.reservationRejected({
          reservationId: payload.reservationId,
          reason: "SEAT_NOT_FOUND",
        });

        channel.ack(msg);
        return;
      }

      if (seat.status !== "FREE") {
        await SeatEventsPublisher.reservationRejected({
          reservationId: payload.reservationId,
          reason: "SEAT_ALREADY_RESERVED",
        });

        channel.ack(msg);
        return;
      }

      seat.status = "RESERVED";
      await seatRepository.save(seat);

      await SeatEventsPublisher.reservationApproved({
        reservationId: payload.reservationId,
        seatId: seat.id,
      });

      channel.ack(msg);
    } catch (error) {
      console.error("❌ Error processing reservation.created", error);
      // no ack → message can be retried / DLQ
    }
  });
}
