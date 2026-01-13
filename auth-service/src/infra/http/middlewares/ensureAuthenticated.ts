import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../../../shared/errors/AppError";

interface TokenPayload {
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

  const [, token] = authHeader.split(" ");

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
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
