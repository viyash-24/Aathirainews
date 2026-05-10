import Navbar from "@/components/Navbar";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import HeroSection from "@/components/HeroSection";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import FAB from "@/components/FAB";
import connectDB from "@/lib/db";
import News from "@/models/News";
import Category from "@/models/Category";

// Opt out of static rendering so the homepage is always fresh
export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();
  const [rawArticles, rawCategories] = await Promise.all([
    News.find({ isPublished: true }).sort({ createdAt: -1 }).limit(12).lean(),
    Category.find({ status: "Active" }).sort({ createdAt: -1 }).lean(),
  ]);

  const initialArticles = rawArticles.map((a: any) => ({
    ...a,
    _id: a._id.toString(),
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    publishDate: a.publishDate ? a.publishDate.toISOString() : null,
  }));

  const initialCategories = rawCategories.map((c: any) => ({
    ...c,
    _id: c._id.toString(),
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  }));

  return (
    <>
      <Navbar />
      <main className="mt-16">
        <BreakingNewsTicker />
        <HeroSection />
        <NewsGrid initialArticles={initialArticles} initialCategories={initialCategories} />
      </main>
      <Footer />
      <FAB />
    </>
  );
}
