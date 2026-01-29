import { RabbitMQConnection } from "./rabbitmq.connection";

export class ReservationPublisher {
  static async reservationCreated(payload: any) {
    const channel = await RabbitMQConnection.getChannel();

    await channel.assertExchange("reservation", "topic", {
      durable: true,
    });

    channel.publish(
      "reservation",
      "reservation.created",
      Buffer.from(JSON.stringify(payload)),
      { persistent: true }
    );

  }
}
