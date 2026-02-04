import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError";
import jwt from "jsonwebtoken";

export function ensureSelfOrAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {

  if (req.user?.role !== "admin" && req.user.id !== req.params.id) {
    throw new AppError("Access denied: not authorized", 403);
  }

  return next();
}