import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: "AathiraiNews" },
    tagline: { type: String, default: "Journalistic Integrity & Modern Sophistication" },
    contactEmail: { type: String, default: "support@aathirainews.com" },
    articlesPerPage: { type: String, default: "12" },
    breakingNewsText: { type: String, default: "முக்கியச் செய்தி..." },
    googleAnalyticsId: { type: String, default: "G-XXXXXXXXXX" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings ||
  mongoose.model("Settings", SettingsSchema);
