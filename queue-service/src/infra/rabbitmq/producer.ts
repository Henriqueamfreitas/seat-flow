import { RabbitMQConnection } from "./connection";

export class RabbitMQProducer {
  static async publish(queue: string, message: object) {
    const channel = await RabbitMQConnection.getChannel();

    await channel.assertQueue(queue, { durable: true });

    channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
  }
}