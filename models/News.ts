/**
 * News Model
 * -----------
 * Mongoose schema for news articles in AathiraiNews.
 * Supports bilingual content (English & Tamil), categories,
 * featured images, and publish/draft status.
 */

import mongoose, { Schema, Document, Model } from "mongoose";

// ─── TypeScript Interface ──────────────────────────────────────
export interface INews extends Document {
  titleEn: string;          // English headline
  titleTa: string;          // Tamil headline (தமிழ் தலைப்பு)
  content: string;          // Article body (bilingual)
  category: string;         // e.g. Politics, Technology, Sports
  language: "tamil" | "english" | "bilingual";
  image: string;            // Featured image URL
  author: string;           // Author name
  isPublished: boolean;     // Controls public visibility
  publishDate: Date | null; // Scheduled publish date
  createdAt: Date;
  updatedAt: Date;
}

// ─── Schema Definition ────────────────────────────────────────
const NewsSchema: Schema<INews> = new Schema(
  {
    titleEn: {
      type: String,
      required: [true, "English title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    titleTa: {
      type: String,
      required: [true, "Tamil title is required"],
      trim: true,
      maxlength: [300, "Title cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Article content is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: [
          "Politics",
          "Technology",
          "Local News",
          "Sports",
          "Cinema",
          "Economy",
          "Education",
          "Health",
          "International",
          "Other",
        ],
        message: "{VALUE} is not a valid category",
      },
      default: "Other",
    },
    language: {
      type: String,
      enum: ["tamil", "english", "bilingual"],
      default: "bilingual",
    },
    image: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "AathiraiNews Team",
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Auto-manages createdAt & updatedAt
  }
);

// ─── Indexes for Query Performance ────────────────────────────
NewsSchema.index({ isPublished: 1, createdAt: -1 }); // Public feed queries
NewsSchema.index({ category: 1 });                    // Category filters
NewsSchema.index({ titleEn: "text", titleTa: "text", content: "text" }); // Full-text search

// ─── Model Export ──────────────────────────────────────────────
// Prevent re-compilation during hot-reloads in development
const News: Model<INews> =
  mongoose.models.News || mongoose.model<INews>("News", NewsSchema);

export default News;
