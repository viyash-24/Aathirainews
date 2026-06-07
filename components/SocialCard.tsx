import { FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

interface SocialLink {
  icon: React.ElementType;
  platform: string;
  handle: string;
  href: string;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: FaFacebookF,
    platform: "Facebook",
    handle: "@AathiraiNews",
    href: "https://www.facebook.com/share/17JgqtaNvJ/",
    color: "group-hover:bg-[#1877F2]", 
  },
  {
    icon: FaWhatsapp,
    platform: "WhatsApp Group",
    handle: "Join Aathirai News",
    href: "https://chat.whatsapp.com/EiqBZq22Bnm6tasKpX5DxN?mode=hqrc",
    color: "group-hover:bg-[#25D366]",
  },
  {
    icon: FaInstagram,
    platform: "Instagram",
    handle: "@aathirai_news",
    href: "https://www.instagram.com/aathirai527",
    color: "group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500",
  },
];

export default function SocialCard() {
  return (
    <div className="bg-surface-container-low p-5 sm:p-8 border border-surface-container-highest rounded-2xl shadow-sm">
      
      {/* Title */}
      <h3 className="font-['Work_Sans'] text-[22px] font-semibold mb-6 text-blue-900 uppercase">
        Follow Our Feed
      </h3>

      {/* Social Links */}
      <div className="flex flex-col gap-5">
        {socialLinks.map((link) => {
          const Icon = link.icon;

          return (
            <a
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 group"
            >
              {/* Icon Box */}
              <div
                className={`w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-gray-700 transition-all duration-300 ${link.color} group-hover:text-white`}
              >
                <Icon size={20} />
              </div>

              {/* Text */}
              <div>
                <p className="text-[11px] tracking-wider font-semibold text-gray-500 uppercase">
                  {link.platform}
                </p>
                <p className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-700 transition">
                  {link.handle}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}