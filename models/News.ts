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
  contentEn: string;
  contentTa: string;
  category: string;         // e.g. Politics, Technology, Sports
  newsLanguage: "tamil" | "english" | "bilingual";
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
    contentEn: {
      type: String,
      required: [
        function (this: any) {
          return this.newsLanguage === "english" || this.newsLanguage === "bilingual";
        },
        "English content is required",
      ],
      default: "",
    },
    contentTa: {
      type: String,
      required: [
        function (this: any) {
          return this.newsLanguage === "tamil" || this.newsLanguage === "bilingual";
        },
        "Tamil content is required",
      ],
      default: "",
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
    newsLanguage: {
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
    timestamps: true,
    language_override: "dummy_language_field",
  }
);

// ─── Indexes for Query Performance ────────────────────────────
NewsSchema.index({ isPublished: 1, createdAt: -1 }); // Public feed queries
NewsSchema.index({ category: 1 });                    // Category filters
NewsSchema.index(
  { titleEn: "text", titleTa: "text", contentEn: "text", contentTa: "text" },
  { default_language: "none", language_override: "dummy_language_field" }
); // Full-text search

// ─── Model Export ──────────────────────────────────────────────
if (mongoose.models.News) {
  delete mongoose.models.News;
}
const News: Model<INews> = mongoose.model<INews>("News", NewsSchema);

export default News;
