"use client";

import { useEffect, useState } from "react";
import { fetchPublishedNews, type NewsArticle } from "@/lib/api";

export default function BreakingNewsTicker() {
  const [titles, setTitles] = useState<string[]>([]);

  useEffect(() => {
    fetchPublishedNews({ limit: 8 })
      .then((res) => {
        const t = res.data.map((a) => a.titleTa || a.titleEn);
        setTitles(t);
      })
      .catch(() => setTitles([]));
  }, []);

  const ticker =
    titles.length > 0
      ? titles.join("                 ✦               ")
      : "AathiraiNews — உங்கள் நம்பகமான செய்தி மூலம்";

  return (
    <div className="breaking-news-gradient text-white py-2 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center">
        <span className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold bg-white text-primary px-3 py-0.5 mr-4 whitespace-nowrap uppercase shrink-0">
          BREAKING NEWS
        </span>
        <div className="overflow-hidden w-full">
          <div
            className="animate-marquee whitespace-nowrap font-[Mukta_Malar] text-[18px] leading-[30px]"
            key={ticker} /* re-trigger animation when content changes */
          >
            {ticker}
          </div>
        </div>
      </div>
    </div>
  );
}
