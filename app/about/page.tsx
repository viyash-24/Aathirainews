import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCard from "@/components/StatCard";
import ContactForm from "@/components/ContactForm";
import SocialCard from "@/components/SocialCard";

export const metadata: Metadata = {
  title: "About Us | AathiraiNews",
  description:
    "Learn about AathiraiNews - our mission, history, and commitment to journalistic integrity for the Tamil-speaking global community.",
};

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
        {/* Mission & Philosophy Bento Grid */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 mb-12 sm:mb-24">
          <div className="bento-grid">
            {/* Mission Box */}
            <div className="col-span-12 md:col-span-7 bg-white p-6 sm:p-10 border border-surface-container-highest flex flex-col justify-center">
              <h2 className="font-['Work_Sans'] text-[24px] sm:text-[32px] leading-[32px] sm:leading-[40px] tracking-[-0.01em] font-bold text-primary mb-4 sm:mb-6">
                Our Mission
              </h2>
              <p className="font-[Inter] text-[16px] sm:text-[18px] leading-[26px] sm:leading-[28px] text-tertiary mb-4 sm:mb-6">
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

            {/* Official Logo Image */}
            <div className="col-span-12 md:col-span-5 h-[250px] sm:h-[300px] md:h-auto rounded-xl overflow-hidden relative border border-surface-container-highest">
              <img
                alt="AathiraiNews Official Logo"
                className="w-full h-full object-cover"
                src="/aathirai_logo.jpeg"
              />
            </div>

            {/* Stats Cards */}
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Bilingual CTA */}
        <section className="max-w-[1280px] mx-auto px-6 mb-16 sm:mb-24">
          <div className="bg-blue-900 text-white rounded-xl p-6 sm:p-8 md:p-12 text-center overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="font-['Work_Sans'] text-[24px] sm:text-[32px] leading-[32px] sm:leading-[40px] tracking-[-0.01em] font-bold mb-4">
                Be Part of the Truth
              </h2>
              <h3 className="font-[Mukta_Malar] text-[22px] sm:text-[28px] md:text-[32px] leading-[32px] sm:leading-[38px] md:leading-[44px] font-semibold mb-6 sm:mb-8">
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

        {/* Contact Section */}
        <section className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-8 border-t border-surface-container-highest">
          {/* Contact Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
            <div className="md:col-span-8">
              <h2 className="font-['Work_Sans'] text-[28px] sm:text-[36px] md:text-[48px] leading-[36px] sm:leading-[44px] md:leading-[56px] tracking-[-0.02em] font-bold text-primary mb-3 sm:mb-4">
                Connect With Us
              </h2>
              <h3 className="font-[Mukta_Malar] text-[22px] sm:text-[28px] md:text-[32px] leading-[32px] sm:leading-[38px] md:leading-[44px] font-semibold mb-3 sm:mb-4">
                எங்களைத் தொடர்பு கொள்ளவும்
              </h3>
              <p className="font-[Inter] text-[15px] sm:text-[18px] leading-[24px] sm:leading-[28px] text-tertiary max-w-2xl">
                Whether you have a news tip, a correction, or just want to share
                your thoughts, our editorial team is ready to listen.
                உங்களிடம் ஏதேனும் செய்திகள் அல்லது கருத்துக்கள்
                இருந்தால் எங்களை அணுகவும்.
              </p>
            </div>
          </div>

          {/* Main Layout: Form and Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <ContactForm />

            {/* Sidebar Info Section */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <SocialCard />

              {/* Office Locations */}
              <div className="grid grid-cols-1 gap-4">
                <div className="relative h-64 overflow-hidden border border-surface-container-highest">
                  <img
                    alt="Modern Newsroom Interior"
                    className="w-full h-full object-cover"
                    src="/aathirai_logo.jpeg"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold uppercase">
                      Hopton
                    </p>
                    <p className="font-[Inter] text-[16px] leading-[24px] font-bold">
                      Uva, Srilanka
                    </p>
                  </div>
                </div>

                <div className="p-5 sm:p-8 bg-white border border-surface-container-highest flex flex-col gap-2">
                  <h4 className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-primary uppercase">
                    Direct Support
                  </h4>
                  <a
                    href="mailto:newsaathirai@gmail.com"
                    className="font-[Inter] text-[15px] sm:text-[18px] leading-[24px] sm:leading-[28px] text-blue-900 font-bold underline-offset-4 block break-all"
                  >
                    newsaathirai@gmail.com
                  </a>
                  <p className="font-[Mukta_Malar] text-[18px] leading-[30px] text-tertiary mt-2">
                    நேரடி உதவிக்கு மின்னஞ்சல் செய்யவும்
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
