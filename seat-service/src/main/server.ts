import "reflect-metadata";
import app from "../infra/http/app";
import { AppDataSource } from "../infra/db/typeorm/database";

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    const PORT = Number(process.env.PORT || 5000);

    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server is running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
