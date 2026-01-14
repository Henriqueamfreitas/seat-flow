import { Router } from "express";
import { CreateReservationController } from "../controllers/reservation/create-reservation.controller";
// import { CreateReservationController } from "../controllers/create-reservation.controller";
// import { CancelReservationController } from "../controllers/cancel-reservation.controller";
// import { ListReservationsController } from "../controllers/list-reservations.controller";

const reservationRoutes = Router();

reservationRoutes.post("/", new CreateReservationController().handle);
// reservationRoutes.post("/:id/cancel", new CancelReservationController().handle);
// reservationRoutes.get("/", new ListReservationsController().handle);

export default reservationRoutes;