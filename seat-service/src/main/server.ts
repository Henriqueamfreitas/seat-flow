import "reflect-metadata";
import app from "../infra/http/app";
import { AppDataSource } from "../infra/db/typeorm/database";
import { reservationCreatedConsumer } from "../infra/http/queue/reservation-created.consumer";

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("🗄️ Database connected");

    // 🔥 Start RabbitMQ consumers
    await reservationCreatedConsumer();
    console.log("🐇 Seat service consumers running");

    const PORT = Number(process.env.PORT || 3003);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting application:", err);
    process.exit(1);
  }
}

bootstrap();
