"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-300 ease-in-out transform active:scale-95"
      aria-label="Toggle dark mode"
    >
      <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
