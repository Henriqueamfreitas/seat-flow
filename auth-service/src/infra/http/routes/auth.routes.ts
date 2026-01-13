import { Router } from "express";
import { LoginController } from "../controllers/auth/login.controller";

const authRoutes = Router();

authRoutes.post("/login", new LoginController().handle);

export default authRoutes;
