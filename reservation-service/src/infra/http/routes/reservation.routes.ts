import { Router } from "express";
import { CreateReservationController } from "../controllers/reservation/create-reservation.controller";
import { CancelReservationController } from "../controllers/reservation/cancel-reservation.controller";
import { ListReservationsController } from "../controllers/reservation/list-reservations.controller";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";

const reservationRoutes = Router();

reservationRoutes.post("/", [ensureAuthenticated], new CreateReservationController().handle);
reservationRoutes.post("/:id/cancel", [ensureAuthenticated], new CancelReservationController().handle);
reservationRoutes.get("/", [ensureAuthenticated, ensureAdmin], new ListReservationsController().handle);

export default reservationRoutes;