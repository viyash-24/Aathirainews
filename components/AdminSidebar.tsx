"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  icon: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
  { icon: "edit_document", label: "News Management", href: "/admin" },
  { icon: "category", label: "Categories", href: "/admin/categories" },
  { icon: "settings", label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-50 dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 flex flex-col gap-2 p-4 z-50">
      <div className="mb-8 px-2">
        <h1 className="font-['Work_Sans'] text-[24px] leading-[32px] font-bold text-blue-900 dark:text-blue-200 tracking-tighter">
          Admin Panel
        </h1>
        <p className="font-[Inter] text-[14px] leading-[20px] text-slate-500">
          AathiraiNews CMS
        </p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 p-3 transition-all duration-200 cursor-pointer font-['Work_Sans'] text-sm ${
                isActive
                  ? "bg-blue-900 text-white dark:bg-blue-700 rounded-md font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:pl-5"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800 px-2 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest overflow-hidden">
          <img
            alt="Admin profile picture"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8QUsSclJVucaFf7coElIfrI_sOY0jn8ygVVHUdJwRdSpuKvmf42spetIi-Zrlwh9j9ayv2GXnIChXiT6g2u4gyIvMOCSmNe6kfAjAe6C17Gin8fnkb-2Jj1ctUxNgtBNnNqrAbR31YxkGq62MO80xmMZORiMz89E8NR1TcmndFTIunxKFY8DRTe3jUAPAhMwEihd9zBJ9wKSGJi_p21Als3VOrV_adbX_Awsb71S4PXrXVZvxqpl0aTJEbBmZMwfXipAZMULjKwA"
          />
        </div>
        <div>
          <p className="font-[Inter] text-[12px] leading-[16px] tracking-[0.05em] font-bold text-on-surface">
            Selva Kumar
          </p>
          <p className="text-[10px] text-slate-500">Editor-in-Chief</p>
          <button 
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.href = "/admin/login";
            }}
            className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer mt-1 text-left"
          >
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
