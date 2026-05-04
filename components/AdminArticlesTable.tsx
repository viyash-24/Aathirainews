"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchAdminNews,
  deleteNews,
  togglePublish,
  type NewsArticle,
  formatDate,
} from "@/lib/api";

interface Props {
  /** Pass a refresh counter — increment it to force a reload */
  refreshKey?: number;
}

export default function AdminArticlesTable({ refreshKey = 0 }: Props) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [busy, setBusy] = useState<string | null>(null); // id of article being mutated

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchAdminNews({
        status: statusFilter === "all" ? undefined : statusFilter,
        search: search || undefined,
        limit: 50,
      });
      setArticles(res.data);
      if (res.stats) setStats(res.stats);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, refreshKey]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setBusy(id);
    try {
      await deleteNews(id);
      setArticles((prev) => prev.filter((a) => a._id !== id));
    } catch (e) {
      alert(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusy(null);
    }
  };

  const handleTogglePublish = async (article: NewsArticle) => {
    setBusy(article._id);
    try {
      const updated = await togglePublish(article._id, !article.isPublished);
      setArticles((prev) =>
        prev.map((a) => (a._id === updated._id ? updated : a))
      );
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to update publish state");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-3 bg-slate-50 border-b border-gray-200 flex flex-wrap justify-between items-center gap-3">
        <div>
          <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-blue-900">
            All Articles
          </h3>
          <div className="flex gap-4 text-xs text-slate-500 mt-0.5">
            <span>Total: <b className="text-slate-700">{stats.total}</b></span>
            <span>Published: <b className="text-emerald-600">{stats.published}</b></span>
            <span>Drafts: <b className="text-amber-600">{stats.drafts}</b></span>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {/* Status filter */}
          {(["all", "published", "draft"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider border transition-colors ${
                statusFilter === s
                  ? "bg-blue-900 text-white border-blue-900"
                  : "border-gray-200 text-slate-500 hover:border-blue-900 hover:text-blue-900"
              }`}
            >
              {s}
            </button>
          ))}
          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-400 text-sm">
              search
            </span>
            <input
              className="pl-8 pr-2 py-1 border border-gray-200 text-sm focus:ring-blue-900 outline-none"
              placeholder="Search articles…"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              {["Article", "Category", "Status", "Author", "Date", "Actions"].map((h) => (
                <th
                  key={h}
                  className={`px-3 py-2 font-[Inter] text-[12px] tracking-[0.05em] font-bold text-slate-500 uppercase ${
                    h === "Actions" ? "text-right" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-200 rounded shrink-0" />
                      <div className="flex flex-col gap-1.5 flex-1">
                        <div className="h-3 bg-slate-200 rounded w-3/4" />
                        <div className="h-3 bg-slate-200 rounded w-1/2" />
                      </div>
                    </div>
                  </td>
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="px-3 py-3">
                      <div className="h-3 bg-slate-200 rounded w-20" />
                    </td>
                  ))}
                  <td className="px-3 py-3" />
                </tr>
              ))
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-16 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl block mb-2">article</span>
                  {search
                    ? `No articles matching "${search}"`
                    : "No articles yet. Create one above!"}
                </td>
              </tr>
            ) : (
              articles.map((article) => (
                <tr
                  key={article._id}
                  className={`hover:bg-slate-50 transition-colors group ${
                    busy === article._id ? "opacity-60 pointer-events-none" : ""
                  }`}
                >
                  {/* Article */}
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 shrink-0 overflow-hidden">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-slate-300 text-lg">
                              image
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-blue-900 text-sm line-clamp-1">
                          {article.titleEn}
                        </p>
                        <p className="font-[Mukta_Malar] text-xs text-slate-500 line-clamp-1">
                          {article.titleTa}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-3 py-2">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                      {article.category}
                    </span>
                  </td>
                  {/* Status */}
                  <td className="px-3 py-2">
                    <span
                      className={`flex items-center gap-1.5 font-bold text-xs uppercase ${
                        article.isPublished ? "text-emerald-600" : "text-amber-600"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          article.isPublished ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {article.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  {/* Author */}
                  <td className="px-3 py-2 text-slate-500 text-xs">{article.author}</td>
                  {/* Date */}
                  <td className="px-3 py-2 text-slate-500 text-xs whitespace-nowrap">
                    {formatDate(article.createdAt)}
                  </td>
                  {/* Actions */}
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end gap-1">
                      {/* Publish toggle */}
                      <button
                        title={article.isPublished ? "Unpublish" : "Publish"}
                        onClick={() => handleTogglePublish(article)}
                        className={`p-1 transition-colors ${
                          article.isPublished
                            ? "text-emerald-500 hover:text-amber-500"
                            : "text-slate-400 hover:text-emerald-600"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {article.isPublished ? "unpublished" : "publish"}
                        </span>
                      </button>
                      {/* Delete */}
                      <button
                        title="Delete"
                        onClick={() => handleDelete(article._id, article.titleEn)}
                        className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 border-t border-gray-100 text-center">
        <button
          onClick={load}
          className="font-[Inter] text-[12px] tracking-[0.05em] font-bold text-blue-900 hover:underline uppercase"
        >
          ↻ Refresh
        </button>
      </div>
    </div>
  );
}
