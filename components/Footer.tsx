import Link from "next/link";

const footerLinks = [
  { label: "Instagram", href: "https://www.instagram.com/aathirai527?igsh=MWJ5OTY3a3V3MG1ucg==*" },
  { label: "Facebook", href: "https://www.facebook.com/share/17JgqtaNvJ/" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-[1280px] mx-auto py-8 sm:py-12 px-4 sm:px-6 flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="font-black text-blue-900 dark:text-blue-100 text-3xl tracking-tighter"
            >
              AathiraiNews
            </Link>
            <p className="font-['Work_Sans'] text-xs text-slate-500 uppercase tracking-widest mt-2">
              Journalistic Integrity &amp; Modern Sophistication
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-['Work_Sans'] text-xs text-slate-400 uppercase tracking-widest hover:text-blue-900 dark:hover:text-blue-200 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full pt-8 mt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="font-['Work_Sans'] text-xs text-slate-500 uppercase tracking-widest">
            © 2024 AathiraiNews. Journalistic Integrity &amp; Modern
            Sophistication.
          </p>
        </div>
      </div>
    </footer>
  );
}
