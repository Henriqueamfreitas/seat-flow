import { RabbitMQConnection } from "./connection";

export async function consume(
  queue: string,
  handler: (data: any) => Promise<void>
) {
  const channel = await RabbitMQConnection.getChannel();

  await channel.assertQueue(queue, { durable: true });

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());
      await handler(data);
      channel.ack(msg);
    } catch (error) {
      console.error(`❌ Error processing ${queue}`, error);
    }
  });
}