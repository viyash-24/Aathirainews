interface SocialLink {
  icon: string;
  platform: string;
  handle: string;
  href: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: "share",
    platform: "Instagram",
    handle: "@aathirai_news",
    href: "#",
  },
  {
    icon: "social_leaderboard",
    platform: "Facebook",
    handle: "AathiraiNews Official",
    href: "#",
  },
];

export default function SocialCard() {
  return (
    <div className="bg-surface-container-low p-8 border border-surface-container-highest">
      <h3 className="font-['Work_Sans'] text-[24px] leading-[32px] font-semibold mb-4 text-blue-900 uppercase">
        Follow Our Feed
      </h3>
      <div className="flex flex-col gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            className="flex items-center gap-4 group"
            href={link.href}
          >
            <div className="w-12 h-12 flex items-center justify-center bg-white border border-outline-variant group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined">{link.icon}</span>
            </div>
            <div>
              <p className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-tertiary uppercase">
                {link.platform}
              </p>
              <p className="font-[Inter] text-[16px] leading-[24px] font-bold">
                {link.handle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
