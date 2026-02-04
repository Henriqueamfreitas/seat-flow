import { Router } from "express";
import { CreateSeatController } from "../controllers/seat/create-seat.controller";
import { ListSeatsController } from "../controllers/seat/list-seats.controller";
import { ReserveSeatController } from "../controllers/seat/reserve-seat.controller";
import { ReleaseSeatController } from "../controllers/seat/release-seat.controller.ts";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const seatRoutes = Router();

seatRoutes.post("/", [ensureAuthenticated, ensureAdmin], new CreateSeatController().handle);
seatRoutes.get("/", [ensureAuthenticated], new ListSeatsController().handle);
seatRoutes.post("/:id/reserve", [ensureAuthenticated], new ReserveSeatController().handle);
seatRoutes.post("/:id/release", new ReleaseSeatController().handle);

export default seatRoutes;
