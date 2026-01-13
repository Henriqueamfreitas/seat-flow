import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../db/typeorm/repositories/user.repository";
import { AppError } from "../../../shared/errors/AppError";

export async function ensureActiveUser(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const userRepository = new UserRepository();

  const user = await userRepository.findById(req.user.id);

  if (!user || !user.isActive) {
    throw new AppError("User is inactive", 403);
  }

  return next();
}