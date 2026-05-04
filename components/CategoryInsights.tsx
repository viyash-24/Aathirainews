"use client";

import { useEffect, useState } from "react";
import { fetchAdminNews, type NewsArticle } from "@/lib/api";

interface CategoryData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-emerald-500", "bg-purple-500", "bg-amber-500"];

export default function CategoryInsights({ refreshKey = 0 }: { refreshKey?: number }) {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminNews({ limit: 100 })
      .then((res) => {
        const articles = res.data;
        const total = articles.length;
        if (total === 0) {
          setCategories([]);
          return;
        }

        const counts: Record<string, number> = {};
        articles.forEach((a) => {
          counts[a.category] = (counts[a.category] || 0) + 1;
        });

        const sortedCategories = Object.entries(counts)
          .sort(([, a], [, b]) => b - a)
          .map(([name, count], i) => ({
            name: name.toUpperCase(),
            count,
            percentage: Math.round((count / total) * 100),
            color: colors[i % colors.length],
          }));

        setCategories(sortedCategories);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [refreshKey]);

  return (
    <div className="bg-white border border-gray-200 p-4 flex flex-col gap-4">
      <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-blue-900">
        Category Insights
      </h3>
      {loading ? (
        <div className="text-sm text-slate-500">Loading insights...</div>
      ) : categories.length === 0 ? (
        <div className="text-sm text-slate-500">No data available yet.</div>
      ) : (
        <div className="flex flex-col gap-4">
          {categories.map((cat) => (
            <div key={cat.name} className="flex flex-col gap-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">{cat.name}</span>
                <span className="text-blue-900">{cat.percentage}% ({cat.count})</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${cat.color}`}
                  style={{ width: `${cat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
