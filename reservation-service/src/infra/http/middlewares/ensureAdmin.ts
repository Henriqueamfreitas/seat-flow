import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError";

export function ensureAdmin(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (req.user.role !== "admin") {
    throw new AppError("Admin access only", 403);
  }

  return next();
}