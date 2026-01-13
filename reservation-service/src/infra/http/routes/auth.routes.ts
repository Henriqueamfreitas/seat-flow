import { Router } from "express";
import { LoginController } from "../controllers/auth/login.controller";

const authRoutes = Router();

authRoutes.post("/", new LoginController().handle);

export default authRoutes;
