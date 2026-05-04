/**
 * Health Check API
 * ─────────────────
 * GET /api/health → Check API and database status
 *
 * Useful for monitoring and deployment verification.
 */

import connectDB from "@/lib/db";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    const dbState = mongoose.connection.readyState;
    const dbStatus =
      dbState === 1
        ? "connected"
        : dbState === 2
        ? "connecting"
        : "disconnected";

    return Response.json({
      success: true,
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: dbStatus,
      environment: process.env.NODE_ENV || "development",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
