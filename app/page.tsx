import Navbar from "@/components/Navbar";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import HeroSection from "@/components/HeroSection";
import NewsGrid from "@/components/NewsGrid";
import Footer from "@/components/Footer";
import FAB from "@/components/FAB";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="mt-16">
        <BreakingNewsTicker />
        <HeroSection />
        <NewsGrid />
      </main>
      <Footer />
      <FAB />
    </>
  );
}
