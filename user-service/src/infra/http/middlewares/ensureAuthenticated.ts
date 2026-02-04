import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";

export interface TokenPayload {
  sub: string;
  role: "admin" | "employee";
}

export function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    throw new AppError("Token format invalid", 401);
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    throw new AppError("Token must start with Bearer", 401);
  }

  if (!token) {
    throw new AppError("Token missing after Bearer", 401);
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    return next();
  } catch (e) {
    console.log('erroooooo', e)
    throw new AppError("Invalid token", 401);
  }
}
