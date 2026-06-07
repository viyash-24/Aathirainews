interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
}

export default function TimelineItem({
  year,
  title,
  description,
}: TimelineItemProps) {
  return (
    <div className="relative">
      <div className="absolute -left-[41px] sm:-left-[57px] top-2 w-4 h-4 bg-primary rounded-full border-4 border-white"></div>
      <span className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold text-primary">
        {year}
      </span>
      <h4 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold mt-2">
        {title}
      </h4>
      <p className="font-[Inter] text-[16px] leading-[24px] text-tertiary mt-2">
        {description}
      </p>
    </div>
  );
}
