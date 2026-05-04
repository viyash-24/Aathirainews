/**
 * Auth API — User Registration
 * ─────────────────────────────
 * POST /api/auth/register → Create a new user account
 *
 * Body: { name, email, password, role? }
 * Note: First user registered is automatically an admin.
 */

import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password, role } = body;

    // ── Validate required fields ────────────────────────────
    if (!name || !email || !password) {
      return Response.json(
        {
          success: false,
          error: "Validation failed",
          details: {
            name: !name ? "Name is required" : undefined,
            email: !email ? "Email is required" : undefined,
            password: !password ? "Password is required" : undefined,
          },
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          error: "Password must be at least 6 characters",
        },
        { status: 400 }
      );
    }

    // ── Check if user already exists ────────────────────────
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return Response.json(
        { success: false, error: "A user with this email already exists" },
        { status: 409 }
      );
    }

    // ── Auto-assign admin role to first user ────────────────
    const userCount = await User.countDocuments();
    const assignedRole = userCount === 0 ? "admin" : role || "user";

    // ── Create user ─────────────────────────────────────────
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: assignedRole,
    });

    // ── Generate JWT token ──────────────────────────────────
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/auth/register error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return Response.json(
        { success: false, error: "Validation failed", message: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Registration failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
