interface StatItem {
  label: string;
  value: string;
  color: string;
}

const stats: StatItem[] = [
  { label: "Total Articles", value: "1,284", color: "text-blue-900" },
  { label: "Published Today", value: "24", color: "text-primary" },
  { label: "Drafts", value: "12", color: "text-tertiary" },
  { label: "Avg. Engagement", value: "88%", color: "text-secondary" },
];

export default function AdminStatsBar() {
  return (
    <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white p-4 border border-gray-200 flex flex-col gap-1"
        >
          <span className="text-slate-500 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold uppercase">
            {stat.label}
          </span>
          <span
            className={`font-['Work_Sans'] text-[24px] leading-[32px] font-semibold ${stat.color}`}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
