import type { Metadata } from "next";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";

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
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>;
}
