import jwt from "jsonwebtoken";
import config from "../config/config.js";
import createHttpError from "http-errors";
import { UserType } from "../types/user.js";
import { JwtPayload } from "../types/jwt.js";
const secret = config.JWT_SECRET;

// Funktion als generischer Schreiben
export function createToken(payload: JwtPayload): string {
  try {
    if (!secret) {
      throw createHttpError(500, "JWt wurde nicht gesetzt");
    }

    const token = jwt.sign(payload, secret, { expiresIn: "900s" });
    return token;
  } catch (error) {
    // next(error)
    throw createHttpError(500, "Token konnte nicht gestellt werden");
  }
}
