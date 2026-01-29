import { connect, Channel, Connection } from "amqplib";

export class RabbitMQConnection {
  private static connection: Connection;
  private static channel: Channel;

  static async getChannel(): Promise<Channel> {
    if (!this.connection) {
      this.connection = await connect(
        process.env.RABBITMQ_URL || "amqp://rabbitmq:5672"
      );

      this.channel = await this.connection.createChannel();
    }

    return this.channel;
  }
}
