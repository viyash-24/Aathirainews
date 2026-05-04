"use client";

import { useState } from "react";
import AdminStatsBar from "@/components/AdminStatsBar";
import AdminNewsForm from "@/components/AdminNewsForm";
import AdminArticlesTable from "@/components/AdminArticlesTable";
import CategoryInsights from "@/components/CategoryInsights";
import AdminFooter from "@/components/AdminFooter";

export default function AdminPage() {
  // Incrementing this tells AdminArticlesTable to reload after a form save
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <main className="p-6 max-w-[1280px]">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
          <div>
            <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-blue-900 uppercase tracking-tight">
              News Management
            </h2>
            <p className="font-[Inter] text-[14px] leading-[20px] text-slate-500">
              Manage, edit, and publish news articles across all categories.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-colors shadow-sm"
              onClick={() => {
                document.querySelector("form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="material-symbols-outlined">add_circle</span>
              CREATE NEWS
            </button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Quick Stats */}
          <AdminStatsBar refreshKey={refreshKey} />

          {/* Create News Form — triggers table refresh on save */}
          <AdminNewsForm onSaved={() => setRefreshKey((k) => k + 1)} />

          {/* Articles Table + Category Insights */}
          <section className="col-span-12 flex flex-col gap-4">
            <AdminArticlesTable refreshKey={refreshKey} />
            <CategoryInsights refreshKey={refreshKey} />
          </section>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
