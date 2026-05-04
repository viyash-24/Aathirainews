/**
 * News API — Collection Routes
 * ──────────────────────────────
 * GET  /api/news  → Fetch all published news (public)
 * POST /api/news  → Create a new article (admin only)
 *
 * Supports query params for GET:
 *   ?category=Politics     → Filter by category
 *   ?language=tamil        → Filter by language
 *   ?search=keyword        → Full-text search
 *   ?page=1&limit=10       → Pagination
 *   ?sort=createdAt        → Sort field
 *   ?order=desc            → Sort direction
 */

import { type NextRequest } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";
import { requireAdmin } from "@/lib/auth";

// Force dynamic rendering (needed for DB queries on Vercel)
export const dynamic = "force-dynamic";

// ─── GET: Fetch Published News (Public) ───────────────────────
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Parse query parameters
    const { searchParams } = request.nextUrl;
    const category = searchParams.get("category");
    const newsLanguage = searchParams.get("language");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    // Build query — only published articles for public access
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (newsLanguage) {
      query.newsLanguage = newsLanguage;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;

    const [news, total] = await Promise.all([
      News.find(query)
        .sort({ [sort]: order })
        .skip(skip)
        .limit(limit)
        .lean(),
      News.countDocuments(query),
    ]);

    return Response.json({
      success: true,
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
    });
  } catch (error) {
    console.error("GET /api/news error:", error);
    return Response.json(
      {
        success: false,
        error: "Failed to fetch news articles",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// ─── POST: Create a New Article (Admin Only) ──────────────────
export async function POST(request: NextRequest) {
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

    // Parse request body
    const body = await request.json();

    const {
      titleEn,
      titleTa,
      contentEn,
      contentTa,
      category,
      newsLanguage,
      image,
      author,
      isPublished,
      publishDate,
    } = body;

    const lang = newsLanguage || "bilingual";
    const requireEn = lang === "english" || lang === "bilingual";
    const requireTa = lang === "tamil" || lang === "bilingual";

    // Validate required fields
    if (!titleEn || !titleTa || (requireEn && !contentEn) || (requireTa && !contentTa)) {
      return Response.json(
        {
          success: false,
          error: "Validation failed",
          details: {
            titleEn: !titleEn ? "English title is required" : undefined,
            titleTa: !titleTa ? "Tamil title is required" : undefined,
            contentEn: requireEn && !contentEn ? "English content is required" : undefined,
            contentTa: requireTa && !contentTa ? "Tamil content is required" : undefined,
          },
        },
        { status: 400 }
      );
    }

    // Create the article
    const news = await News.create({
      titleEn,
      titleTa,
      contentEn,
      contentTa,
      category: category || "Other",
      newsLanguage: newsLanguage || "bilingual",
      image: image || "",
      author: author || admin.email,
      isPublished: isPublished ?? false,
      publishDate: publishDate || null,
    });

    return Response.json(
      {
        success: true,
        message: "Article created successfully",
        data: news,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/news error:", error);

    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      return Response.json(
        { success: false, error: "Validation failed", message: error.message },
        { status: 400 }
      );
    }

    return Response.json(
      {
        success: false,
        error: "Failed to create article",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
