import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import connectDB from "@/lib/db";
import News from "@/models/News";
import { Metadata, ResolvingMetadata } from "next";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

async function getArticle(id: string) {
  try {
    await connectDB();
    const article = await News.findOne({ _id: id, isPublished: true }).lean();
    if (!article) return null;
    // Simple serialization to fix warning
    return JSON.parse(JSON.stringify(article));
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) {
    return { title: "Not Found" };
  }
  return {
    title: `${article.titleEn || article.titleTa} | Aathirai News`,
    description: (article.contentEn || article.contentTa || "").substring(0, 160),
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  const dateStr = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navbar />
      <main className="mt-16 bg-slate-50 dark:bg-slate-950 min-h-screen py-10">
        <article className="max-w-[800px] mx-auto bg-white dark:bg-slate-900 border border-outline-variant p-6 md:p-10 shadow-sm">
          <div className="mb-6">
            <span className="inline-block bg-primary text-white font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold px-3 py-1 mb-4 uppercase">
              {article.category}
            </span>
            <h1 className="font-[Mukta_Malar] text-4xl md:text-5xl font-bold leading-tight mb-4 text-slate-900 dark:text-white">
              {article.newsLanguage === "tamil" ? article.titleTa : article.titleEn || article.titleTa}
            </h1>
            {article.newsLanguage === "bilingual" && article.titleTa !== article.titleEn && (
              <h2 className="font-[Mukta_Malar] text-2xl md:text-3xl font-semibold leading-relaxed mb-4 text-slate-700 dark:text-slate-300">
                {article.titleTa}
              </h2>
            )}
            
            <div className="flex items-center gap-4 text-sm text-slate-500 font-[Inter] mb-8 border-y border-slate-100 dark:border-slate-800 py-3">
              <div className="flex flex-col">
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  By {article.author || "AathiraiNews Team"}
                </span>
                <span>{dateStr}</span>
              </div>
            </div>
          </div>

          {article.image && (
            <div className="w-full aspect-video mb-8">
              <img
                src={article.image}
                alt={article.titleEn || article.titleTa}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex flex-col gap-8 text-lg text-slate-800 dark:text-slate-200">
            {(article.newsLanguage === "bilingual" || article.newsLanguage === "english") && article.contentEn && (
              <div className="font-[Inter] leading-relaxed whitespace-pre-wrap">
                {article.contentEn}
              </div>
            )}
            {(article.newsLanguage === "bilingual" || article.newsLanguage === "tamil") && article.contentTa && (
              <div className="font-[Mukta_Malar] leading-relaxed whitespace-pre-wrap mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                {article.contentTa}
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
