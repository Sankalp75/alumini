import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { AlumniRole, AuthUser } from "../types.js";

const JWT_SECRET = process.env.JWT_SECRET || "dev-insecure-secret-change-me";

export interface AuthedRequest extends Request {
  user?: AuthUser;
}

export function signToken(user: AuthUser): string {
  return jwt.sign(
    {
      uid: user.uid,
      name: user.name,
      email: user.email,
      role: user.role,
      photoURL: user.photoURL,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as AuthUser;
    req.user = {
      uid: payload.uid,
      name: payload.name,
      email: payload.email,
      role: payload.role as AlumniRole,
      photoURL: payload.photoURL || "",
    };
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function optionalAuth(req: AuthedRequest, _res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next();
    return;
  }
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET) as AuthUser;
    req.user = {
      uid: payload.uid,
      name: payload.name,
      email: payload.email,
      role: payload.role as AlumniRole,
      photoURL: payload.photoURL || "",
    };
  } catch {
    // ignore invalid token for optional routes
  }
  next();
}

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (req.user.role !== "admin") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }
  next();
}
