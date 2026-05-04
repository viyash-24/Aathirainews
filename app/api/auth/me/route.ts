/**
 * Auth API — Get Current User Profile
 * ─────────────────────────────────────
 * GET /api/auth/me → Get authenticated user's profile
 *
 * Requires: Authorization: Bearer <token>
 */

import connectDB from "@/lib/db";
import User from "@/models/User";
import { getAuthFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // Verify authentication
    const payload = getAuthFromRequest(request);
    if (!payload) {
      return Response.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch user from DB (excluding password)
    const user = await User.findById(payload.userId).lean();

    if (!user) {
      return Response.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("GET /api/auth/me error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch profile",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
