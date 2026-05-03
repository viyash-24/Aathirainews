interface CategoryData {
  name: string;
  percentage: number;
  color: string;
}

const categories: CategoryData[] = [
  { name: "POLITICS", percentage: 42, color: "bg-primary" },
  { name: "TECHNOLOGY", percentage: 28, color: "bg-secondary" },
  { name: "LOCAL NEWS", percentage: 30, color: "bg-tertiary" },
];

export default function CategoryInsights() {
  return (
    <div className="bg-white border border-gray-200 p-4 flex flex-col gap-4">
      <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-blue-900">
        Category Insights
      </h3>
      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col gap-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">{cat.name}</span>
              <span className="text-blue-900">{cat.percentage}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${cat.color}`}
                style={{ width: `${cat.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
