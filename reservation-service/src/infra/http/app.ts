import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-hanlder";
import reservationRoutes from "./routes/reservation.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (_req, res) => {
//   res.send("API is running 🚀  ");
// });


app.use("/", reservationRoutes);
app.use(errorHandler)

export default app;
