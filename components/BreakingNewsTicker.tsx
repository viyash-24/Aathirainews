import connectDB from "@/lib/db";
import News from "@/models/News";

export default async function BreakingNewsTicker() {
  await connectDB();
  const articles = await News.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(8)
    .select("titleTa titleEn")
    .lean();

  const titles = articles.map((a: any) => a.titleTa || a.titleEn);

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
            key={ticker}
          >
            {ticker}
          </div>
        </div>
      </div>
    </div>
  );
}
