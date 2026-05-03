/**
 * Authentication Utilities
 * -------------------------
 * JWT-based authentication helpers for:
 * - Generating access tokens
 * - Verifying tokens from request headers
 * - Role-based access control (admin/user)
 */

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "aathirai-news-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d"; // Token validity duration

/**
 * Payload structure stored inside JWT tokens.
 */
export interface JWTPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}

/**
 * Generates a signed JWT token for a given user.
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies and decodes a JWT token string.
 * Returns the decoded payload or null if invalid/expired.
 */
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

/**
 * Extracts and verifies the JWT from a request's Authorization header.
 * Expects: Authorization: Bearer <token>
 * Returns the decoded payload or null.
 */
export function getAuthFromRequest(request: Request): JWTPayload | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  return verifyToken(token);
}

/**
 * Checks if the request is from an authenticated admin.
 * Returns the payload if admin, null otherwise.
 */
export function requireAdmin(request: Request): JWTPayload | null {
  const payload = getAuthFromRequest(request);

  if (!payload || payload.role !== "admin") {
    return null;
  }

  return payload;
}
