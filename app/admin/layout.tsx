import type { Metadata } from "next";
import AdminSidebar from "@/components/AdminSidebar";

export const metadata: Metadata = {
  title: "AathiraiNews Admin Dashboard",
  description:
    "Admin dashboard for managing AathiraiNews articles, categories, and settings.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}
