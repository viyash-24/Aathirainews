import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import SocialCard from "@/components/SocialCard";

export const metadata: Metadata = {
  title: "Contact Us - AathiraiNews",
  description:
    "Get in touch with AathiraiNews editorial team. Share news tips, corrections, or feedback. எங்களைத் தொடர்பு கொள்ளவும்.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 max-w-[1280px] mx-auto px-6">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-8">
            <h1 className="font-['Work_Sans'] text-[48px] leading-[56px] tracking-[-0.02em] font-bold text-primary mb-4">
              Connect With Us
            </h1>
            <h2 className="font-[Mukta_Malar] text-[32px] leading-[44px] font-semibold mb-4">
              எங்களைத் தொடர்பு கொள்ளவும்
            </h2>
            <p className="font-[Inter] text-[18px] leading-[28px] text-tertiary max-w-2xl">
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

              <div className="p-8 bg-white border border-surface-container-highest flex flex-col gap-2">
                <h4 className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-primary uppercase">
                  Direct Support
                </h4>
                <a href="mailto:newsaathirai@gmail.com" className="font-[Inter] text-[18px] leading-[28px] text-blue-900 font-bold  underline-offset-4 block">
                  newsaathirai@gmail.com
                </a>
                <p className="font-[Mukta_Malar] text-[18px] leading-[30px] text-tertiary mt-2">
                  நேரடி உதவிக்கு மின்னஞ்சல் செய்யவும்
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
