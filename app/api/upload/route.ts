import { NextRequest } from "next/server";
import path from "path";
import { promises as fs } from "fs";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return Response.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { success: false, error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || ".png";
    const safeExt = ext.toLowerCase().slice(0, 10);
    const filename = `${crypto.randomBytes(16).toString("hex")}${safeExt}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const fullPath = path.join(uploadDir, filename);
    await fs.writeFile(fullPath, buffer);

    return Response.json({
      success: true,
      url: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);
    return Response.json(
      {
        success: false,
        error: "Upload failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
