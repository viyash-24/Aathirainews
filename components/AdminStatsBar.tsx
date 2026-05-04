"use client";

import { useEffect, useState } from "react";
import { fetchAdminNews } from "@/lib/api";

export default function AdminStatsBar({ refreshKey = 0 }: { refreshKey?: number }) {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminNews({ limit: 1 })
      .then((res) => {
        if (res.stats) {
          setStats(res.stats);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  const statItems = [
    { label: "Total Articles", value: loading ? "..." : stats.total, color: "text-blue-900" },
    { label: "Published", value: loading ? "..." : stats.published, color: "text-primary" },
    { label: "Drafts", value: loading ? "..." : stats.drafts, color: "text-tertiary" },
    { label: "Avg. Engagement", value: loading ? "..." : "88%", color: "text-secondary" }, // Placeholder for engagement
  ];

  return (
    <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
      {statItems.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 border border-gray-200 flex flex-col gap-1"
        >
          <span className="text-slate-500 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold uppercase">
            {stat.label}
          </span>
          <span
            className={`font-['Work_Sans'] text-[24px] leading-[32px] font-semibold ${stat.color}`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
