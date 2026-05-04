import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Settings from "@/models/Settings";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  await connectDB();
  try {
    // There should only be one settings document
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = requireAdmin(req);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  try {
    const body = await req.json();
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create(body);
    } else {
      settings = await Settings.findByIdAndUpdate(settings._id, body, { new: true });
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 400 });
  }
}
