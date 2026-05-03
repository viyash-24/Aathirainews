interface NewsCardProps {
  id?: string;
  image: string;
  category: string;
  categoryTamil: string;
  timeAgo: string;
  title: string;
  description: string;
}

export default function NewsCard({
  image,
  category,
  categoryTamil,
  timeAgo,
  title,
  description,
}: NewsCardProps) {
  return (
    <article className="bg-white dark:bg-slate-900 border border-outline-variant hover:shadow-sm transition-all group">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={image}
          alt={title}
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-primary uppercase">
            {category} | {categoryTamil}
          </span>
          <span className="text-[10px] text-slate-500">{timeAgo}</span>
        </div>
        <h3 className="font-[Mukta_Malar] text-[24px] leading-[32px] font-semibold leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-[Inter] text-[14px] leading-[20px] text-slate-600 dark:text-slate-400 line-clamp-3">
          {description}
        </p>
        <button className="self-start mt-2 border border-blue-900 text-blue-900 dark:border-blue-400 dark:text-blue-400 font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold py-2 px-4 hover:bg-blue-900 hover:text-white dark:hover:bg-blue-400 dark:hover:text-slate-900 transition-colors uppercase">
          READ MORE
        </button>
      </div>
    </article>
  );
}
