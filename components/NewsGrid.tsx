"use client";

import { useState } from "react";
import NewsCard from "./NewsCard";

interface NewsItem {
  image: string;
  category: string;
  categoryTamil: string;
  categoryKey: string;
  timeAgo: string;
  title: string;
  description: string;
}

const newsItems: NewsItem[] = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUNp-hujKld41-a3K_fEILON6dqDhoSsrpO6y44llN1-gaK151PNg-hajClNhfGxeijxtcquKN32TRD1b4XvSdZCC1WuNIo3_HqniyBwkro8y-N1oyFuBaieJz2UdCYTu3427_aCMXYWjUrp8564IAFFHXEsEpfKWvQPFOqWVy7py8EwdDBHgy_tJbkRaMePK6LDwPQPmQms6mue61uuGIqN62X1w80eQhyhSuhLonyT10na4v43drd3_TCbxsPMwJwqCRItxFVMw",
    category: "ECONOMY",
    categoryTamil: "பொருளாதாரம்",
    categoryKey: "ECONOMY",
    timeAgo: "2 HOURS AGO",
    title: "தங்கம் விலை கடும் சரிவு: பொதுமக்கள் மகிழ்ச்சி",
    description:
      "Gold prices see a sharp decline today in major cities. ஆபரணத் தங்கம் விலையில் இன்று அதிரடி மாற்றம் ஏற்பட்டுள்ளது.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuABXkOr6GFHQMxS3D9qXBgqEa0hYpYlUXiqHvR2TlXCk-FBqvOlal_H_kQC_FU6A00uQE7YoPz9UL1A29UUgRqdmjindRx8FKCK9oS521ut7-wLtvbLO93TX1M6VmGwxAqQzSh3b12vEBwM-82iRwAHgdiGoXZ4spragQF0kGYhIgoBSQLVL1iFVzesVyihOSH_vmh8iQLxu8kPcJzHPOWafhAaDnU3TEwLklYJg91lVb4rWRGzJUDTeHtvh75_VVwIFQOW_7raZ2U",
    category: "AGRICULTURE",
    categoryTamil: "விவசாயம்",
    categoryKey: "ECONOMY",
    timeAgo: "4 HOURS AGO",
    title: "காவிரி நீர்ப்பிடிப்பு பகுதிகளில் கனமழை",
    description:
      "Heavy rains reported in Cauvery catchment areas. டெல்டா மாவட்டங்களில் விவசாயப் பணிகள் தீவிரம் அடைந்துள்ளன.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA7BDc9S1hiZLSDkWuZkuNvibB86QBMigRDA58APCS8L8s1pv-DYawZP3Tsm8PWjKaOo4ya7vEXJycGH7pL-LVGAlTm628E-380pvc0BteL5KJqiHWg55s83U5hnDKAXwytApCbb8CvKjZgKT6vXMrG_z_CoZyEUUros9ylXv2iJDxHGU2T7XJBa9_I7ofd_ji3HP5Y_PcyNmDev7YZaxqFFYvst11PSpXi2hvXezeLluZli5zMQRcqBb2lLnflfXgUpP20D5MBttY",
    category: "AI",
    categoryTamil: "செயற்கை நுண்ணறிவு",
    categoryKey: "POLITICS",
    timeAgo: "6 HOURS AGO",
    title: "ஏஐ தொழில்நுட்பத்தின் எதிர்காலம் என்ன?",
    description:
      "The future of AI technology and its social impacts. மனித வாழ்வில் ஏஐ ஏற்படுத்தும் மாற்றங்கள் குறித்த சிறப்புப் பார்வை.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDDWPdQQngoU65G-njuQA0Sr6FfNV2dxaSbOVCep2UVG__2V0pQZQhI-7RtueetMq02i-UWCSNmNh4b4qjc0MvIFuNBuWqTL_etJmNXjKJDLe4AWGCegv5jy45BT5uNrCqc_zxMOZgZXKI19kXFehu0wXCYFjNCX1_i1liuxYru5oMRkNZhj0arnEarDMNaUB1mxqDh-zg0a5R4Z7odakHQroJ2HfH919Ip_B8hVZvYW_qQAxBWP8xN9izNsAxhcSy69RXobpOZe8Y",
    category: "EDUCATION",
    categoryTamil: "கல்வி",
    categoryKey: "ECONOMY",
    timeAgo: "1 DAY AGO",
    title: "கல்வி உதவித்தொகை விண்ணப்பங்கள் வரவேற்பு",
    description:
      "Applications open for higher education scholarships. மாணவர்களுக்கான புதிய கல்வி உதவித்தொகை குறித்த முழு விவரங்கள்.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApM_oQXKtzcLL0VoAktviLimpWHMsVlcryP4iKB2vNDad7xNb6HcHZc_8vRbf-gTvi3cUk7a7CG-qjRlwJ8JrUzYm71KWhYBj_-j6396TYt4fYnTKliIfw5l7MBuD6tfnyGtvlp6xA8PmDGgqQoSN10CUsW2nrpzuIADt6fwsFtViMrgkyHmFhVW3EnM_I_iPvt9krfzBwtzTJeRlHDlZwftcegsfcHIux8-Ad0OtkMUXseqFvkz99JzTq5ORVJQLgys3nWmRNv3o",
    category: "CINEMA",
    categoryTamil: "சினிமா",
    categoryKey: "POLITICS",
    timeAgo: "1 DAY AGO",
    title: "இந்த வார திரைவிமர்சனம்: புதிய திரைப்படங்கள்",
    description:
      "Weekly movie reviews of latest releases. தியேட்டர்களில் வெற்றிகரமாக ஓடிக்கொண்டிருக்கும் படங்களின் விமர்சனம்.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDWvqxZCsXIycR45lGdPu5LkSlZReRM0rM_1jKLVKzkycOTOokfIRqhLT-1BGVRpd8DU6h1YbU1FXKsyAjl6FRJuGQoGrM0-fDj4Mj4_iPqMdNq6ZZ31IGn7J0B_q3NMYuXv93trwoGVMWA6RYEMUrerTS6Hp3tS5TdsUUtyk_8_-AdoRlEQ05fsafVITPngju1pydRe4bd-01K4Y53_ewj2o_bvyZ7do7eGVw7AErST7enzXFVTaHwhVkLzaADC53eW43xO64xX3I",
    category: "HEALTH",
    categoryTamil: "ஆரோக்கியம்",
    categoryKey: "ECONOMY",
    timeAgo: "2 DAYS AGO",
    title: "மன அழுத்தத்தை குறைக்கும் எளிய வழிகள்",
    description:
      "Simple ways to reduce mental stress and anxiety. அன்றாட வாழ்வில் கடைபிடிக்க வேண்டிய எளிய ஆரோக்கிய குறிப்புகள்.",
  },
];

const filters = ["ALL", "POLITICS", "ECONOMY"];

export default function NewsGrid() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredItems =
    activeFilter === "ALL"
      ? newsItems
      : newsItems.filter((item) => item.categoryKey === activeFilter);

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-8 border-b-4 border-primary pb-2">
        <h2 className="font-['Work_Sans'] text-[32px] leading-[40px] tracking-[-0.01em] font-bold flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            newspaper
          </span>
          சமீபத்திய செய்திகள் | RECENT NEWS
        </h2>
        <div className="hidden sm:flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold px-3 py-1 cursor-pointer transition-colors uppercase ${
                activeFilter === filter
                  ? "bg-primary text-white"
                  : "bg-surface-container text-on-surface-variant hover:bg-primary hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <NewsCard
            key={index}
            image={item.image}
            category={item.category}
            categoryTamil={item.categoryTamil}
            timeAgo={item.timeAgo}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
