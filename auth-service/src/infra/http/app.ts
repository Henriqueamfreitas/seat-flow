import "express-async-errors";
import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/error-hanlder";
import authRoutes from "./routes/auth.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("API is running 🚀  ");
});

app.use("/", authRoutes);
app.use(errorHandler)

export default app;
