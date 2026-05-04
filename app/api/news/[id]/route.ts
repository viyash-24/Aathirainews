/**
 * News API — Single Article Routes
 * ──────────────────────────────────
 * GET    /api/news/:id  → Fetch a single published article (public)
 * PUT    /api/news/:id  → Update an article (admin only)
 * DELETE /api/news/:id  → Delete an article (admin only)
 * PATCH  /api/news/:id  → Toggle publish/unpublish (admin only)
 */

import { type NextRequest } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";
import { requireAdmin } from "@/lib/auth";
import mongoose from "mongoose";

// Force dynamic rendering
export const dynamic = "force-dynamic";

/**
 * Helper: Validate MongoDB ObjectId format
 */
function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

// ─── GET: Fetch Single Published Article (Public) ─────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Next.js 16: params is a Promise

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, error: "Invalid article ID format" },
        { status: 400 }
      );
    }

    await connectDB();

    const news = await News.findById(id).lean();

    if (!news) {
      return Response.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    // For public access, only return published articles
    // Check if request has admin auth — admins can view any article
    const authHeader = request.headers.get("authorization");
    if (!news.isPublished && !authHeader) {
      return Response.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.error("GET /api/news/[id] error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch article",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── PUT: Update an Article (Admin Only) ──────────────────────
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const admin = requireAdmin(request);
    if (!admin) {
      return Response.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, error: "Invalid article ID format" },
        { status: 400 }
      );
    }

    await connectDB();

    const body = await request.json();

    // Prevent updating immutable fields
    delete body._id;
    delete body.createdAt;

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      {
        new: true,            // Return the updated document
        runValidators: true,  // Apply schema validators on update
      }
    ).lean();

    if (!updatedNews) {
      return Response.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Article updated successfully",
      data: updatedNews,
    });
  } catch (error) {
    console.error("PUT /api/news/[id] error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return Response.json(
        { success: false, error: "Validation failed", message: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Failed to update article",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── DELETE: Remove an Article (Admin Only) ───────────────────
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const admin = requireAdmin(request);
    if (!admin) {
      return Response.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, error: "Invalid article ID format" },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedNews = await News.findByIdAndDelete(id).lean();

    if (!deletedNews) {
      return Response.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "Article deleted successfully",
      data: deletedNews,
    });
  } catch (error) {
    console.error("DELETE /api/news/[id] error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to delete article",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── PATCH: Toggle Publish/Unpublish (Admin Only) ─────────────
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Verify admin authentication
    const admin = requireAdmin(request);
    if (!admin) {
      return Response.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return Response.json(
        { success: false, error: "Invalid article ID format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Parse the body for explicit publish state, or toggle
    const body = await request.json().catch(() => ({}));

    const article = await News.findById(id);

    if (!article) {
      return Response.json(
        { success: false, error: "Article not found" },
        { status: 404 }
      );
    }

    // If body contains explicit isPublished value, use it; otherwise toggle
    const newPublishState =
      typeof body.isPublished === "boolean"
        ? body.isPublished
        : !article.isPublished;

    article.isPublished = newPublishState;
    article.updatedAt = new Date();
    await article.save();

    return Response.json({
      success: true,
      message: newPublishState
        ? "Article published successfully"
        : "Article unpublished successfully",
      data: article.toObject(),
    });
  } catch (error) {
    console.error("PATCH /api/news/[id] error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to update publish status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
