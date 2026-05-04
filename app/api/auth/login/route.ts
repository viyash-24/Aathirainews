/**
 * Auth API — User Login
 * ──────────────────────
 * POST /api/auth/login → Authenticate and get JWT token
 *
 * Body: { email, password }
 * Returns: { token, user }
 */

import connectDB from "@/lib/db";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { email, password } = body;

    // ── Validate required fields ────────────────────────────
    if (!email || !password) {
      return Response.json(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 }
      );
    }

    if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return Response.json(
        {
          success: false,
          error: "Please provide a valid email address",
        },
        { status: 400 }
      );
    }

    // ── Find user (explicitly select password for comparison) ─
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );

    if (!user) {
      return Response.json(
        { success: false, error: "Email address not found" },
        { status: 401 }
      );
    }

    // ── Verify password ─────────────────────────────────────
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return Response.json(
        { success: false, error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // ── Generate JWT token ──────────────────────────────────
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return Response.json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("POST /api/auth/login error:", error);
    return Response.json(
      {
        success: false,
        error: "Login failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
