import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import TimelineItem from "@/components/TimelineItem";

export const metadata: Metadata = {
  title: "About Us | AathiraiNews",
  description:
    "Learn about AathiraiNews - our mission, history, and commitment to journalistic integrity for the Tamil-speaking global community.",
};

const timelineData = [
  {
    year: "2010",
    title: "The Inception",
    description:
      "Founded as a local independent news bulletin in Chennai with a team of five dedicated journalists.",
  },
  {
    year: "2015",
    title: "Digital Transformation",
    description:
      "Launched our first bilingual mobile application, reaching the Tamil diaspora in Singapore and Canada.",
  },
  {
    year: "2024",
    title: "The Modern Era",
    description:
      "Now a multi-platform media house utilizing AI for hyper-local reporting and investigative journalism.",
  },
];

const stats = [
  {
    icon: "verified",
    title: "Credibility",
    description:
      "Every report is double-verified by our senior editorial board.",
    variant: "default" as const,
  },
  {
    icon: "speed",
    title: "Speed",
    description:
      "Real-time updates delivered across our global network within seconds.",
    variant: "primary" as const,
  },
  {
    icon: "public",
    title: "Global Reach",
    description:
      "Connecting over 10 million Tamil voices worldwide monthly.",
    variant: "default" as const,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="max-w-[1280px] mx-auto px-6 mb-16">
          <div className="relative w-full h-[500px] overflow-hidden rounded-xl">
            <img
              alt="Newsroom atmosphere"
              className="w-full h-full object-cover"
              src="/aathirai_logo.jpeg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
              <div className="max-w-3xl">
                <span className="bg-primary text-white font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold px-4 py-1 mb-4 inline-block uppercase tracking-widest">
                  Our Legacy
                </span>
                <h1 className="font-['Work_Sans'] text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-white mb-4">
                  Integrity in Every Ink, Precision in Every Pixel.
                </h1>
                <p className="font-[Mukta_Malar] text-[32px] leading-[44px] font-semibold text-white leading-tight">
                  உண்மை, நேர்மை, வேகம் - ஆதிரை செய்திகளின் அடையாளம்.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Philosophy Bento Grid */}
        <section className="max-w-[1280px] mx-auto px-6 mb-24">
          <div className="bento-grid">
            {/* Mission Box */}
            <div className="col-span-12 md:col-span-7 bg-white p-10 border border-surface-container-highest flex flex-col justify-center">
              <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="font-[Inter] text-[18px] leading-[28px] text-tertiary mb-6 leading-relaxed">
                AathiraiNews was founded with a singular purpose: to deliver
                unfiltered, accurate, and rapid news to the Tamil-speaking
                global community. In an era of misinformation, we serve as the
                lighthouse of truth, combining traditional journalistic ethics
                with modern digital sophistication.
              </p>
              <p className="font-[Mukta_Malar] text-[18px] leading-[30px] text-on-surface-variant">
                உலகெங்கிலும் வாழும் தமிழ் மக்களுக்குத் துல்லியமான,
                நடுநிலையான செய்திகளை உடனுக்குடன் வழங்குவதே ஆதிரை
                செய்திகளின் அடிப்படை நோக்கம். வதந்திகளுக்கும் போலிச்
                செய்திகளுக்கும் இடமளிக்காமல், உண்மையை உரக்கச் சொல்லும்
                ஊடகமாகத் திகழ்கிறோம்.
              </p>
            </div>

            {/* History Image */}
            <div className="col-span-12 md:col-span-5 h-[400px] md:h-auto rounded-xl overflow-hidden relative border border-surface-container-highest">
              <img
                alt="Printing press"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9kwkDhIbZn2TFYWSrfnVQLh_6RK7Dj43MprGUINUlFNUCEQ-MOB8kLHYvlG-TXcPreQOFSL6l4i252SgdjfHXQn8uV9oDTeZfQA2spWMlj2aa6lC84IMmN0z-9TWZX9jw5_8u0Zy74-RVks0hvDAM8U5RqHoh2kZ1mjv0wf9YNoD18tPDuh6RPWCcCRu0yCOkNmbF5xQuh9wzGNpC6fRtquxFFs-vb5VlLk-rrIqeh-Doh8WtxVQIVHU3sm2bhPB-nA3wqpxaTD4"
              />
            </div>

            {/* Stats Cards */}
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* History Timeline */}
        <section className="bg-surface-container-lowest py-24">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/3">
                <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold text-blue-900 mb-4 sticky top-24">
                  The Journey So Far
                </h2>
                <p className="font-[Mukta_Malar] text-[18px] leading-[30px] text-slate-600">
                  எங்கள் வளர்ச்சி - ஓர் வரலாற்றுப் பார்வை.
                </p>
              </div>
              <div className="md:w-2/3 border-l-2 border-outline-variant pl-12 space-y-16">
                {timelineData.map((item, index) => (
                  <TimelineItem key={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bilingual CTA */}
        <section className="max-w-[1280px] mx-auto px-6 mt-24">
          <div className="bg-blue-900 text-white rounded-xl p-12 text-center overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold mb-4">
                Be Part of the Truth
              </h2>
              <h3 className="font-[Mukta_Malar] text-[32px] leading-[44px] font-semibold mb-8">
                உண்மையின் குரலாய் எங்களுடன் இணையுங்கள்
              </h3>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-white text-blue-900 font-bold px-8 py-3 rounded-md hover:bg-red-700 hover:text-white transition-all transform active:scale-95">
                  Subscribe Now
                </button>
                <button className="border border-white/50 text-white font-bold px-8 py-3 rounded-md hover:bg-white/10 transition-all">
                  Join Our Team
                </button>
              </div>
            </div>
            {/* Abstract BG Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-700/10 rounded-full -ml-48 -mb-48"></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
