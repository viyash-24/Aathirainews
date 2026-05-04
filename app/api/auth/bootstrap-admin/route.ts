import connectDB from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    if (process.env.NODE_ENV !== "development") {
      return Response.json({ success: false, error: "Not found" }, { status: 404 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const bootstrapSecret = process.env.BOOTSTRAP_SECRET;

    if (!adminEmail || !adminPassword || !bootstrapSecret) {
      return Response.json(
        {
          success: false,
          error: "Missing env vars",
          message: "Set ADMIN_EMAIL, ADMIN_PASSWORD, and BOOTSTRAP_SECRET in .env",
        },
        { status: 500 }
      );
    }

    const providedSecret = request.headers.get("x-bootstrap-secret");
    if (providedSecret !== bootstrapSecret) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const email = adminEmail.toLowerCase();
    const existing = await User.findOne({ email }).select("+password");

    if (!existing) {
      await User.create({
        name: "Admin",
        email,
        password: adminPassword,
        role: "admin",
      });

      return Response.json({ success: true, message: "Admin user created" });
    }

    existing.role = "admin";
    existing.password = adminPassword;
    await existing.save();

    return Response.json({ success: true, message: "Admin user updated" });
  } catch (error) {
    console.error("POST /api/auth/bootstrap-admin error:", error);
    return Response.json(
      {
        success: false,
        error: "Bootstrap failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
