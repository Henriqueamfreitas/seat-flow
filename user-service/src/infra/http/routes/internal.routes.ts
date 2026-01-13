import { Router } from "express";
import { FindUserByEmailController } from "../controllers/internal/find-user-by-email.controller";

const internalRoutes = Router();

internalRoutes.get(
  "/by-email/:email",
  new FindUserByEmailController().handle
);

export default internalRoutes;
