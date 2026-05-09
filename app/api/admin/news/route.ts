/**
 * Admin News API — All Articles (Including Drafts)
 * ──────────────────────────────────────────────────
 * GET /api/admin/news → Fetch ALL news (published + drafts)
 *
 * This endpoint is exclusively for the admin dashboard.
 * Requires admin JWT authentication.
 *
 * Supports query params:
 *   ?status=published|draft  → Filter by status
 *   ?category=Politics       → Filter by category
 *   ?search=keyword          → Full-text search
 *   ?page=1&limit=10         → Pagination
 */

import { type NextRequest } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

// ─── GET: Fetch All Articles for Admin Dashboard ──────────────
export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const admin = requireAdmin(request);
    if (!admin) {
      return Response.json(
        { success: false, error: "Unauthorized. Admin access required." },
        { status: 401 }
      );
    }

    await connectDB();

    // Parse query parameters
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status"); // "published" | "draft"
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    // Build query — no isPublished filter (show everything)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};

    if (status === "published") {
      query.isPublished = true;
    } else if (status === "draft") {
      query.isPublished = false;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { titleEn: { $regex: search, $options: "i" } },
        { titleTa: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const [news, total, publishedCount, draftCount, aggregations] = await Promise.all([
      News.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments(query),
      News.countDocuments({ isPublished: true }),
      News.countDocuments({ isPublished: false }),
      News.aggregate([
        {
          $group: {
            _id: null,
            totalViews: { $sum: "$views" },
            totalComments: { $sum: "$commentsCount" }
          }
        }
      ]),
    ]);

    const totalViews = aggregations[0]?.totalViews || 0;
    const totalComments = aggregations[0]?.totalComments || 0;

    return Response.json({
      success: true,
      data: news,
      stats: {
        total: publishedCount + draftCount,
        published: publishedCount,
        drafts: draftCount,
        totalViews,
        totalComments
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/news error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch articles",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
