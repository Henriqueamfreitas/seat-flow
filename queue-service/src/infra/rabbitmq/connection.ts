import amqplib from "amqplib";

export class RabbitMQConnection {
  private static connection: amqplib.Connection;
  private static channel: amqplib.Channel;

  static async getChannel(): Promise<amqplib.Channel> {
    if (!this.connection) {
      this.connection = await amqplib.connect(
        process.env.RABBITMQ_URL || "amqp://rabbitmq:5672"
      );

      this.channel = await this.connection.createChannel();
    }

    return this.channel;
  }
}
