"use client";

import AdminFooter from "@/components/AdminFooter";
import { useState } from "react";

interface StatCard {
  label: string;
  value: string;
  change: string;
  up: boolean;
  icon: string;
  color: string;
  bg: string;
}

const stats: StatCard[] = [
  {
    label: "Total Articles",
    value: "1,284",
    change: "+18 this week",
    up: true,
    icon: "article",
    color: "text-blue-900",
    bg: "bg-blue-50",
  },
  {
    label: "Published Today",
    value: "24",
    change: "+6 vs yesterday",
    up: true,
    icon: "publish",
    color: "text-primary",
    bg: "bg-red-50",
  },
  {
    label: "Drafts",
    value: "12",
    change: "-3 vs yesterday",
    up: false,
    icon: "draft",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Avg. Engagement",
    value: "88%",
    change: "+4% this month",
    up: true,
    icon: "bar_chart",
    color: "text-secondary",
    bg: "bg-indigo-50",
  },
  {
    label: "Total Views",
    value: "2.4M",
    change: "+12% this month",
    up: true,
    icon: "visibility",
    color: "text-emerald-700",
    bg: "bg-emerald-50",
  },
  {
    label: "Comments",
    value: "3,891",
    change: "+142 today",
    up: true,
    icon: "comment",
    color: "text-purple-700",
    bg: "bg-purple-50",
  },
];

const recentActivity = [
  {
    action: "Published",
    article: "Economic reforms announced for 2024",
    user: "Selva Kumar",
    time: "10:45 AM",
    status: "published",
  },
  {
    action: "Draft Saved",
    article: "New AI breakthrough in local tech hub",
    user: "Priya R.",
    time: "09:12 AM",
    status: "draft",
  },
  {
    action: "Published",
    article: "District level sports meet starts today",
    user: "Arun M.",
    time: "Yesterday, 6:30 PM",
    status: "published",
  },
  {
    action: "Edited",
    article: "காவிரி நீர்ப்பிடிப்பு பகுதிகளில் கனமழை",
    user: "Selva Kumar",
    time: "Yesterday, 2:00 PM",
    status: "edited",
  },
  {
    action: "Published",
    article: "ஏஐ தொழில்நுட்பத்தின் எதிர்காலம் என்ன?",
    user: "Priya R.",
    time: "Oct 23, 11:00 AM",
    status: "published",
  },
];

const categoryBreakdown = [
  { name: "Politics", count: 540, pct: 42, color: "bg-primary" },
  { name: "Technology", count: 360, pct: 28, color: "bg-secondary" },
  { name: "Local News", count: 385, pct: 30, color: "bg-tertiary" },
  { name: "Sports", count: 180, pct: 14, color: "bg-emerald-500" },
  { name: "Cinema", count: 120, pct: 9, color: "bg-purple-500" },
];

const topArticles = [
  {
    rank: 1,
    title: "புதிய உள்கட்டமைப்பு திட்டங்களுக்கு அரசு ஒப்புதல்",
    views: "142K",
    category: "Politics",
  },
  {
    rank: 2,
    title: "ஏஐ தொழில்நுட்பத்தின் எதிர்காலம் என்ன?",
    views: "98K",
    category: "Technology",
  },
  {
    rank: 3,
    title: "தங்கம் விலை கடும் சரிவு",
    views: "76K",
    category: "Economy",
  },
  {
    rank: 4,
    title: "சர்வதேச கிரிக்கெட்: இந்தியா வெற்றி",
    views: "65K",
    category: "Sports",
  },
  {
    rank: 5,
    title: "கல்வி உதவித்தொகை விண்ணப்பங்கள் வரவேற்பு",
    views: "54K",
    category: "Education",
  },
];

export default function DashboardPage() {
  const [period, setPeriod] = useState<"today" | "week" | "month">("week");

  return (
    <>
      <main className="p-6 max-w-[1280px] min-h-[calc(100vh-140px)]">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-gray-200 pb-4 gap-4">
          <div>
            <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-blue-900 uppercase tracking-tight">
              Dashboard Overview
            </h2>
            <p className="font-[Inter] text-[14px] leading-[20px] text-slate-500">
              Welcome back, Selva Kumar · AathiraiNews CMS
            </p>
          </div>
          <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
            {(["today", "week", "month"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                  period === p
                    ? "bg-blue-900 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-gray-200 p-4 flex flex-col gap-3 rounded-lg hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`font-[Inter] text-[11px] font-bold text-slate-500 uppercase tracking-wider`}
                >
                  {stat.label}
                </span>
                <div className={`${stat.bg} p-1.5 rounded-md`}>
                  <span
                    className={`material-symbols-outlined text-[18px] ${stat.color}`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>
                </div>
              </div>
              <span
                className={`font-['Work_Sans'] text-[26px] leading-none font-bold ${stat.color}`}
              >
                {stat.value}
              </span>
              <span
                className={`text-[11px] font-semibold flex items-center gap-1 ${
                  stat.up ? "text-emerald-600" : "text-red-500"
                }`}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {stat.up ? "trending_up" : "trending_down"}
                </span>
                {stat.change}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Category Breakdown */}
          <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-['Work_Sans'] text-[18px] font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                pie_chart
              </span>
              Category Breakdown
            </h3>
            <div className="flex flex-col gap-4">
              {categoryBreakdown.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700">{cat.name}</span>
                    <span className="text-slate-500">
                      {cat.count} articles · {cat.pct}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full`}
                      style={{ width: `${cat.pct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Visual Bars */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                Publish Rate (per day)
              </p>
              <div className="flex items-end gap-1.5 h-16">
                {[14, 22, 18, 30, 24, 28, 24].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-100 rounded-t-sm hover:bg-blue-900 transition-colors cursor-pointer"
                    style={{ height: `${(h / 30) * 100}%` }}
                    title={`${h} articles`}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="flex-1 text-center">
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-['Work_Sans'] text-[18px] font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                history
              </span>
              Recent Activity
            </h3>
            <div className="flex flex-col divide-y divide-gray-100">
              {recentActivity.map((item, i) => (
                <div key={i} className="py-3 flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.status === "published"
                        ? "bg-emerald-500"
                        : item.status === "draft"
                        ? "bg-amber-400"
                        : "bg-blue-400"
                    }`}
                  ></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 line-clamp-1">
                      {item.article}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      <span
                        className={`font-bold ${
                          item.status === "published"
                            ? "text-emerald-600"
                            : item.status === "draft"
                            ? "text-amber-600"
                            : "text-blue-600"
                        }`}
                      >
                        {item.action}
                      </span>{" "}
                      by {item.user} · {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-3 w-full text-center text-xs font-bold text-blue-900 hover:underline uppercase tracking-wider">
              View Full Audit Log
            </button>
          </div>

          {/* Top Performing Articles */}
          <div className="col-span-12 lg:col-span-4 bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-['Work_Sans'] text-[18px] font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                trending_up
              </span>
              Top Articles
            </h3>
            <div className="flex flex-col divide-y divide-gray-100">
              {topArticles.map((art) => (
                <div key={art.rank} className="py-3 flex items-center gap-3">
                  <span className="font-['Work_Sans'] text-[20px] font-black text-slate-200 w-6 text-center shrink-0">
                    {art.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-700 line-clamp-1">
                      {art.title}
                    </p>
                    <span className="text-[11px] text-slate-400">
                      {art.category}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-blue-900 shrink-0">
                    {art.views}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick summary cards */}
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Subscribers
                </p>
                <p className="font-['Work_Sans'] text-[18px] font-bold text-blue-900">
                  48.2K
                </p>
              </div>
              <div className="bg-red-50 rounded-lg p-3 text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Newsletter CTR
                </p>
                <p className="font-['Work_Sans'] text-[18px] font-bold text-primary">
                  24.6%
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-12 bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-['Work_Sans'] text-[18px] font-bold text-blue-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                bolt
              </span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: "edit_document",
                  label: "New Article",
                  href: "/admin",
                  color: "bg-blue-900 text-white",
                },
                {
                  icon: "category",
                  label: "Manage Categories",
                  href: "/admin/categories",
                  color: "bg-slate-100 text-slate-700 hover:bg-slate-200",
                },
                {
                  icon: "settings",
                  label: "Settings",
                  href: "/admin/settings",
                  color: "bg-slate-100 text-slate-700 hover:bg-slate-200",
                },
                {
                  icon: "monitor",
                  label: "View Live Site",
                  href: "/",
                  color: "bg-slate-100 text-slate-700 hover:bg-slate-200",
                },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg text-center font-bold text-sm transition-all ${action.color}`}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {action.icon}
                  </span>
                  {action.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
      <AdminFooter />
    </>
  );
}
