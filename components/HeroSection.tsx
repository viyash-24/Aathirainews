interface SecondaryFeature {
  image: string;
  category: string;
  categoryTamil: string;
  title: string;
  description: string;
}

const secondaryFeatures: SecondaryFeature[] = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZnBQorfSqLtc8mLDepdF3rJkOVRg7nFWSd7k-fCIuWuO-sT17A2xuXxq5JUjAj6_jSVMSzk8267lHI3drmZNsSPCCUCgPZRYEaX9NO618P_a1id65m1avoExuEnwWSKJSTX9wuDI9UhxHG0uuSWbnWeTBnn5hhITk90w9w87rK29VKd6JbkYdJqpLeWkrDsfQ6S5oDurAvrZKs27ML_8uip9LDFSpTzQZYa9WTDzz-PYyaUIQ5nsKcdroDzSqB0K7MgN4I4OQC0A",
    category: "TECH",
    categoryTamil: "தொழில்நுட்பம்",
    title: "புதிய ஸ்மார்ட்போன் சந்தை நிலவரம்",
    description: "Market trends for latest tech gadgets in 2024.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGETZWCyQ_-HTksz4_mJg45Q-iJ8PcwdvC38CPvll0VXWVxXTPZisWcjXFJ0Fswk2IKXJxRoJg9LlO0_i4CPWZvFedG4Y-b9Y5HmDvERv0ohk1_g3ri4pgMSsq7Is_cnvhAOKCU4Hw-m1PsLc0Y1LzzV_rrPyAsyxPlscFoccqlDAW6II2THmQdDTPV_xHg7Rn_rU1hpaqySc_oXpM7SRTtWlxiClE2m8ufK7G8Wm6kGmk6UdqQP2Wl-mscBIRkoLng23F8cg_HrI",
    category: "SPORTS",
    categoryTamil: "விளையாட்டு",
    title: "சர்வதேச கிரிக்கெட்: இந்தியா வெற்றி",
    description: "India secures victory in dramatic final match.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLzghVnlsy1-dKAaR8D7FxMT3wwWQJAOD-xg7E_xUYpxgMKMZbhm7d4DAD7nceMbH1fnsRBv4wfrpEVXKmj-IfskL_Onul_MmUBw5ml0J-n-LE8PSKY5UVutaq7sWzUq96PrM3efCDu7CF_jnaWtCfncrSXxOb-y6anPnrLT69wS0Gp4qMjKnhIiaOYwXmbU_JfWX7OTCj8yR_Lo2hYT24bJKBox4ek5dJHb1JExgRGBrJxCzQO96jZ7MAaj4YPQ3ukQU1thw1Qsk",
    category: "LIFESTYLE",
    categoryTamil: "வாழ்க்கை முறை",
    title: "வேலை-வாழ்க்கை சமநிலை குறிப்புகள்",
    description: "Essential tips for modern professional balance.",
  },
];

export default function HeroSection() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Feature */}
        <div className="lg:col-span-8 relative group overflow-hidden border border-outline-variant bg-white dark:bg-slate-900">
          <div className="aspect-video relative overflow-hidden">
            <img
              alt="Government Building"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4N0YFlXrOwkjRo8E938tBSyVKUHWGNoCbCxKE35tox829WbEu4AEbunujxoET4x4u-ztfULsvGNT6oUSHFRi3lY_BRh6lo4uHznhXojvFyImsDStgJywOZ_0u-HHrBdzUXfE7W0oYsUHrtPJ3TsiDrSVMvBQTxnGND1Udp2em_MFYqiivYNe4Ih9pCCUD3lqj3eqRp7w9T8S3Q4ljoless59mdav87kfOj4qSOJ-YUVpkoWjDafXzB3AWUFZwoXhGQDQzCLrEbYs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          </div>
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <span className="inline-block bg-primary text-white font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold px-3 py-1 mb-3 uppercase">
              POLITICS | அரசியல்
            </span>
            <h1 className="font-[Mukta_Malar] text-[48px] leading-[56px] tracking-[-0.02em] font-bold mb-4">
              புதிய உள்கட்டமைப்பு திட்டங்களுக்கு அரசு ஒப்புதல்
            </h1>
            <p className="font-[Inter] text-[18px] leading-[28px] text-slate-200 line-clamp-2 max-w-2xl mb-6">
              Government approves major infrastructure projects worth billions.
              மாநிலம் முழுவதும் தரம் உயர்த்தப்பட்ட சாலைகள் மற்றும் பாலங்கள்
              அமைக்கப்படும் என அதிகாரப்பூர்வ அறிவிப்பு.
            </p>
            <button className="bg-primary hover:bg-red-800 text-white font-bold py-3 px-8 text-sm uppercase tracking-widest transition-colors flex items-center gap-2">
              வாசிக்க | READ MORE{" "}
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Secondary Features */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {secondaryFeatures.map((feature, index) => (
            <div
              key={index}
              className="flex-1 bg-white dark:bg-slate-900 border border-outline-variant p-4 flex gap-4 hover:bg-surface transition-colors cursor-pointer"
            >
              <div className="w-1/3">
                <img
                  className="aspect-square object-cover"
                  src={feature.image}
                  alt={feature.title}
                />
              </div>
              <div className="w-2/3">
                <span className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-primary text-[10px] uppercase">
                  {feature.category} | {feature.categoryTamil}
                </span>
                <h3 className="font-[Mukta_Malar] text-[16px] leading-[24px] font-bold leading-tight mt-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
