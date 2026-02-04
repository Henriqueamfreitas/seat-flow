import "reflect-metadata";
import app from "../infra/http/app";
import { AppDataSource } from "../infra/db/typeorm/database";
import { reservationStatusConsumer } from "../infra/queue/reservation-status.consumer";

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    console.log("🗄️ Database connected");

    // 🔥 Start RabbitMQ consumers (reservation status updates)
    await reservationStatusConsumer();
    console.log("🐇 Reservation service consumers running");

    const PORT = Number(process.env.PORT || 3002);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Error starting application:", err);
    process.exit(1);
  }
}

bootstrap();
