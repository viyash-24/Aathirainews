"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import NewsCard from "./NewsCard";
import { fetchPublishedNews, type NewsArticle, type CategoryData, timeAgo } from "@/lib/api";

interface NewsGridProps {
  initialArticles?: any[];
  initialCategories?: any[];
}

export default function NewsGrid({ initialArticles = [], initialCategories = [] }: NewsGridProps) {
  const [articles, setArticles] = useState<any[]>(initialArticles);
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const isFirstRender = useRef(true);

  const load = useCallback(async (category: string) => {
    setLoading(true);
    try {
      const res = await fetchPublishedNews({
        category: category === "ALL" ? undefined : category,
        limit: 12,
      });
      setArticles(res.data);
    } catch {
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    load(activeFilter);
  }, [activeFilter, load]);

  const categoryNames = ["ALL", ...categories.map(c => c.name)];

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 border-b-4 border-primary pb-2 gap-3">
        <h2 className="font-['Work_Sans'] text-[20px] sm:text-[24px] md:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[40px] tracking-[-0.01em] font-bold flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">newspaper</span>
          <span className="hidden sm:inline">சமீபத்திய செய்திகள் | RECENT NEWS</span>
          <span className="sm:hidden">RECENT NEWS</span>
        </h2>
        <div className="hidden sm:flex gap-2 flex-wrap justify-end">
          {categoryNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold px-3 py-1 cursor-pointer transition-colors uppercase ${
                activeFilter === cat
                  ? "bg-primary text-white"
                  : "bg-surface-container text-on-surface-variant hover:bg-primary hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-100 animate-pulse">
              <div className="aspect-[16/9] bg-slate-200" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 bg-slate-200 rounded w-1/3" />
                <div className="h-5 bg-slate-200 rounded w-full" />
                <div className="h-5 bg-slate-200 rounded w-4/5" />
                <div className="h-3 bg-slate-200 rounded w-full" />
                <div className="h-3 bg-slate-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Articles */}
      {!loading && articles.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => {
            const cat = categories.find(c => c.name.toLowerCase() === article.category.toLowerCase());
            const snippetBase =
              article.newsLanguage === "tamil"
                ? article.contentTa
                : article.contentEn;
            return (
              <NewsCard
                key={article._id}
                id={article._id}
                image={article.image}
                category={article.category.toUpperCase()}
                categoryTamil={cat?.nameTa || ""}
                timeAgo={timeAgo(article.createdAt)}
                title={article.titleTa || article.titleEn}
                description={
                  snippetBase.slice(0, 150) +
                  (snippetBase.length > 150 ? "…" : "")
                }
              />
            )
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && articles.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <span className="material-symbols-outlined text-slate-300 text-[64px] mb-4">
            newspaper
          </span>
          <p className="font-['Work_Sans'] text-xl font-bold text-slate-400">
            No articles found
          </p>
          <p className="text-sm text-slate-400 mt-1">
            {activeFilter === "ALL"
              ? "No published articles yet. Add some from the admin panel."
              : `No published articles in "${activeFilter}" yet.`}
          </p>
        </div>
      )}
    </section>
  );
}
