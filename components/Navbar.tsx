"use client";

import { useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-[1280px] w-full mx-auto flex justify-between items-center h-16 px-4 sm:px-6">
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-black text-blue-900 dark:text-blue-100 tracking-tighter"
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
        <div className="flex items-center gap-2 sm:gap-4">
          <SearchBar />
          <button
            className="hidden md:flex p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 ease-in-out transform active:scale-95"
            aria-label="Toggle language"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
              language
            </span>
          </button>
          <ThemeToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md">
          <div className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-['Work_Sans'] font-semibold uppercase tracking-wider text-sm py-3 px-2 transition-all duration-300 ${
                    isActive
                      ? "text-red-700 dark:text-red-500 bg-red-50 dark:bg-red-950/30"
                      : "text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-blue-200 hover:bg-slate-50 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
