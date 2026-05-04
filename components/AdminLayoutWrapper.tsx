"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const didRedirectRef = useRef(false);

  useEffect(() => {
    // Check if user is logged in (has token)
    const checkAuth = async () => {
      const token = localStorage.getItem("aathirai_token") ?? localStorage.getItem("token");
      const isLoginPage = pathname === "/admin/login";

      if (!token) {
        if (!isLoginPage) {
          if (!didRedirectRef.current) {
            didRedirectRef.current = true;
            router.replace("/admin/login");
          }
        } else {
          setIsLoading(false);
        }
      } else {
        try {
          const res = await fetch("/api/auth/me", {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error("Unauthorized");
          }

          const json = await res.json();
          const role = json?.data?.role;

          if (role !== "admin") {
            throw new Error("NotAdmin");
          }

          setIsAuthenticated(true);

          if (isLoginPage) {
            if (!didRedirectRef.current) {
              didRedirectRef.current = true;
              router.replace("/admin");
            }
          } else {
            setIsLoading(false);
          }
        } catch {
          localStorage.removeItem("token");
          localStorage.removeItem("aathirai_token");
          localStorage.removeItem("user");

          if (!isLoginPage) {
            if (!didRedirectRef.current) {
              didRedirectRef.current = true;
              router.replace("/admin/login");
            }
          } else {
            setIsLoading(false);
          }
        }
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (pathname !== "/admin/login" && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // If we are on the login page, don't show the sidebar
  if (pathname === "/admin/login") {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  // Normal admin layout with sidebar
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 ml-64">{children}</div>
    </div>
  );
}
