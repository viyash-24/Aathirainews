export default function BreakingNewsTicker() {
  return (
    <div className="breaking-news-gradient text-white py-2 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 flex items-center">
        <span className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold bg-white text-primary px-3 py-0.5 mr-4 whitespace-nowrap uppercase">
          BREAKING NEWS
        </span>
        <div className="animate-marquee whitespace-nowrap font-[Mukta_Malar] text-[18px] leading-[30px]">
          முக்கியச் செய்தி: தமிழக பட்ஜெட் 2024 - கல்வி மற்றும்
          சுகாதாரத்திற்கு முன்னுரிமை அளிக்கப்படும் என அறிவிப்பு.
        </div>
      </div>
    </div>
  );
}
