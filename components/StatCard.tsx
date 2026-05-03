interface StatCardProps {
  icon: string;
  title: string;
  description: string;
  variant?: "default" | "primary";
}

export default function StatCard({
  icon,
  title,
  description,
  variant = "default",
}: StatCardProps) {
  const isPrimary = variant === "primary";

  return (
    <div
      className={`col-span-12 md:col-span-4 p-8 flex flex-col items-center text-center ${
        isPrimary
          ? "bg-primary text-white"
          : "bg-surface-container-low"
      }`}
    >
      <span
        className={`material-symbols-outlined text-5xl mb-4 ${
          isPrimary ? "text-white" : "text-primary"
        }`}
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold mb-2">
        {title}
      </h3>
      <p
        className={`font-[Inter] text-[14px] leading-[20px] ${
          isPrimary ? "opacity-80" : "text-slate-500"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
