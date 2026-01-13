import "express-async-errors";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middlewares/error-hanlder";
import internalRoutes from "./routes/internal.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.get("/", (_req, res) => {
//   res.send("API is running 🚀  ");
// });

app.use("/internal", internalRoutes);
app.use("/", userRoutes);
app.use(errorHandler)

export default app;
