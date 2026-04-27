"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-16 px-6 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1280px] w-full mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-black text-blue-900 dark:text-blue-100 tracking-tighter"
          >
            AathiraiNews
          </Link>
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-['Work_Sans'] font-semibold uppercase tracking-wider text-sm transition-all duration-300 ${
                    isActive
                      ? "text-red-700 dark:text-red-500 border-b-2 border-red-700 dark:border-red-500 pb-1"
                      : "text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-200"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SearchBar />
          <button
            className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 ease-in-out transform active:scale-95"
            aria-label="Toggle language"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
              language
            </span>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
