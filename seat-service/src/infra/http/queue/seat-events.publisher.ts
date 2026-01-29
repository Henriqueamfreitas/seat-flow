import { RabbitMQConnection } from "./rabbitmq.connection";

export class SeatEventsPublisher {
  static async reservationApproved(payload: any) {
    const channel = await RabbitMQConnection.getChannel();

    await channel.assertExchange("reservation", "topic", { durable: true });

    channel.publish(
      "reservation",
      "reservation.approved",
      Buffer.from(JSON.stringify(payload))
    );
  }

  static async reservationRejected(payload: any) {
    const channel = await RabbitMQConnection.getChannel();

    await channel.assertExchange("reservation", "topic", { durable: true });

    channel.publish(
      "reservation",
      "reservation.rejected",
      Buffer.from(JSON.stringify(payload))
    );
  }
}
