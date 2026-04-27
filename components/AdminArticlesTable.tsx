"use client";

import { useState } from "react";

interface Article {
  id: number;
  image: string;
  titleEn: string;
  titleTa: string;
  category: string;
  status: "Published" | "Draft";
  date: string;
}

const articles: Article[] = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAu79LxBCJltTnAt14oYcDoqW3moB0KA_A5NC-q2vZ_YJ1qIWyWECK0sr3FpAGLLcP5VPvNaqSQsauwQPN4nC51LIeLVC8DyBdD_Dr_fGPNAGIfE7bRFzV6CW9XYvRveoQgKo1V3Tx9i7VSYBrTMWL0s82MAK5NN64XquKv1ruQ9rzi9uA2XWyYZPlXiFm-dTRWzJ8VBCsI7vIBgk_AlMe6wpld3mmt0cg_Lav9SbAQvar7Rq2PAGU-KuQWZqMmPs5vsPPyX-VZwQI",
    titleEn: "Economic reforms announced for 2024",
    titleTa: "பொருளாதார சீர்திருத்தங்கள் அறிவிப்பு",
    category: "Politics",
    status: "Published",
    date: "Oct 24, 10:45 AM",
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3xK6QLM0pdhxBJX4S9hFirBHH2S4wa2z_IiVhjH5odtG3wmv5URfeU2IqlfFrnWCYmtuH2LctUplhNhh0UGXyJ2E986OJF3zhkBTslwv-hM-ieKSkvWpnI37OFTBfC6wlfXJJ2bdsMkF_cT9hYYVuORZBqoXWpkdoWM2v_z25cYcmAOCadcKdaUd8cRCz8ZMgNqM8G5VvBqenH3GQ95OLjUTkajIT0TREANyCLqGZfN_lii-WJzu1TSCGy0OrRuyEV3Spa7j6DYs",
    titleEn: "New AI breakthrough in local tech hub",
    titleTa: "புதிய ஏஐ தொழில்நுட்ப புரட்சி",
    category: "Tech",
    status: "Draft",
    date: "Oct 24, 09:12 AM",
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNI9AcqD2pcV1wpn5vtzF_3S360PqGyZ8ia1jximV4yW1hxbTHQAuQnImFDT0ZGp9in6_D7kW99Ko_X4rsgDqMUW4L9oi1JwkWE9lKWfgocI9ARQIf5LNVnZ9XOaZFzKcjycC7dDnCH4pU0m3kLYkP8nlguMX2b_F_rgbjbrb5YHz3L2yoD6hVk0atB5sW56bCsqa9JYbxueloyO_I5mBvs9jIS7ZCA6p4qewzNRa4v56TzTZ1Mgz9qgHZNGKUleD0uAe6R17qyFk",
    titleEn: "District level sports meet starts today",
    titleTa: "மாவட்ட விளையாட்டு போட்டிகள் தொடக்கம்",
    category: "Sports",
    status: "Published",
    date: "Oct 23, 06:30 PM",
  },
];

export default function AdminArticlesTable() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articles.filter(
    (article) =>
      article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleTa.includes(searchQuery)
  );

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="p-3 bg-slate-50 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-blue-900">
          Recent Articles
        </h3>
        <div className="flex gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-2 top-1.5 text-slate-400 text-sm">
              search
            </span>
            <input
              className="pl-8 pr-2 py-1 border border-gray-200 text-sm focus:ring-blue-900 outline-none"
              placeholder="Filter articles..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white border-b border-gray-100">
              <th className="px-3 py-2 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-500 uppercase">
                Article
              </th>
              <th className="px-3 py-2 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-500 uppercase">
                Category
              </th>
              <th className="px-3 py-2 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-500 uppercase">
                Status
              </th>
              <th className="px-3 py-2 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-500 uppercase">
                Date
              </th>
              <th className="px-3 py-2 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-slate-500 uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredArticles.map((article) => (
              <tr
                key={article.id}
                className="hover:bg-slate-50 transition-colors group"
              >
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-200 shrink-0">
                      <img
                        alt="Article thumbnail"
                        className="w-full h-full object-cover"
                        src={article.image}
                      />
                    </div>
                    <div>
                      <p className="font-bold text-blue-900 line-clamp-1">
                        {article.titleEn}
                      </p>
                      <p className="font-[Mukta_Malar] text-xs text-slate-500">
                        {article.titleTa}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2">
                  <span className="bg-slate-100 text-slate-600 px-2 py-1 text-[10px] font-bold uppercase tracking-wider">
                    {article.category}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <span
                    className={`flex items-center gap-1.5 font-bold text-xs uppercase ${
                      article.status === "Published"
                        ? "text-emerald-600"
                        : "text-amber-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        article.status === "Published"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    ></span>
                    {article.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-slate-500 text-xs">{article.date}</td>
                <td className="px-3 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-slate-400 hover:text-blue-900 transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="p-1 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-3 py-2 border-t border-gray-100 flex justify-center">
        <button className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-blue-900 hover:underline uppercase">
          View All Articles
        </button>
      </div>
    </div>
  );
}
