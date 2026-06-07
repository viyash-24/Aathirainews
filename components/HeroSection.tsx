import Link from "next/link";
import Image from "next/image";
import { type NewsArticle, timeAgo } from "@/lib/api";
import connectDB from "@/lib/db";
import News from "@/models/News";

export default async function HeroSection() {
  await connectDB();
  const rawArticles = await News.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(4)
    .lean();
  
  const articles: any[] = rawArticles.map((a: any) => ({
    ...a,
    _id: a._id.toString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
  }));

  const hero = articles[0];
  const sidebar = articles.slice(1, 4);

  const heroSnippetBase =
    hero?.newsLanguage === "tamil" ? hero.contentTa : hero?.contentEn;

  /* ── Empty state (no published news yet) ────────────────────── */
  if (!hero) {
    return (
      <section className="max-w-[1280px] mx-auto px-6 py-4">
        <div className="flex flex-col items-center justify-center min-h-[320px] border border-dashed border-slate-300 rounded-lg">
          <span className="material-symbols-outlined text-slate-300 text-[56px] mb-3">
            article
          </span>
          <p className="font-['Work_Sans'] text-xl font-bold text-slate-400">
            No published articles yet
          </p>
          <p className="text-sm text-slate-400 mt-1">
            Publish an article from the admin panel to see it here.
          </p>
        </div>
      </section>
    );
  }

  /* ── Live hero ───────────────────────────────────────────────── */
  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feature */}
        <div className="lg:col-span-8 relative group overflow-hidden border border-outline-variant bg-white dark:bg-slate-900">
          <div className="aspect-video relative overflow-hidden">
            {hero.image ? (
              <Image
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={hero.image}
                alt={hero.titleEn || "Hero Image"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[64px] opacity-30">
                  newspaper
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 p-4 sm:p-6 md:p-8 text-white">
            <span className="inline-block bg-primary text-white font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold px-3 py-1 mb-3 uppercase">
              {hero.category}
            </span>
            <h1 className="font-[Mukta_Malar] text-[22px] sm:text-[30px] md:text-[40px] leading-[30px] sm:leading-[40px] md:leading-[52px] tracking-[-0.02em] font-bold mb-2 sm:mb-4 line-clamp-3">
              {hero.titleTa || hero.titleEn}
            </h1>
            <p
              className={`${
                hero.newsLanguage === "tamil" ? "font-[Mukta_Malar]" : "font-[Inter]"
              } text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-slate-200 line-clamp-2 max-w-2xl mb-3 sm:mb-6 hidden sm:block`}
            >
              {(heroSnippetBase || hero.titleEn).slice(0, 140) +
                ((heroSnippetBase || hero.titleEn).length > 140 ? "…" : "")}
            </p>
            <div className="flex items-center gap-4">
              <Link href={`/news/${hero._id}`} className="bg-primary hover:bg-red-800 text-white font-bold py-2 px-4 sm:py-3 sm:px-8 text-xs sm:text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
                வாசிக்க | READ MORE{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <span className="text-xs text-slate-400 uppercase">{timeAgo(hero.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Sidebar Features */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {sidebar.length > 0 ? (
            sidebar.map((article) => (
              <Link
                key={article._id}
                href={`/news/${article._id}`}
                className="flex-1 group bg-white dark:bg-slate-900 border border-outline-variant p-4 flex gap-4 hover:bg-surface transition-colors cursor-pointer"
              >
                <div className="w-1/3 shrink-0 relative aspect-square overflow-hidden">
                  {article.image ? (
                    <Image
                      className="w-full h-full object-cover"
                      src={article.image}
                      alt={article.titleEn || "Article Image"}
                      fill
                      sizes="(max-width: 1024px) 33vw, 15vw"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-slate-100 flex items-center justify-center">
                      <span className="material-symbols-outlined text-slate-300 text-2xl">
                        image
                      </span>
                    </div>
                  )}
                </div>
                <div className="w-2/3">
                  <span className="font-[Inter] text-[10px] font-bold text-primary uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="text-slate-900 dark:text-white dark:group-hover:text-slate-900 font-[Mukta_Malar] text-[15px] leading-[22px] font-bold mt-1 line-clamp-3 break-words">
                    {article.titleTa || article.titleEn}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">{timeAgo(article.createdAt)}</p>
                </div>
              </Link>
            ))
          ) : (
            /* Fill remaining slots with empty placeholders */
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-slate-50 border border-dashed border-slate-200 p-4 flex items-center justify-center"
              >
                <span className="text-xs text-slate-300 uppercase tracking-wider">
                  More articles coming soon
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
