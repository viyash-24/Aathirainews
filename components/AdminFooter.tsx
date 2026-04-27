import Link from "next/link";

export default function AdminFooter() {
  return (
    <footer className="ml-64 w-[calc(100%-256px)] py-12 px-6 flex flex-col items-center gap-6 max-w-[1280px] text-center border-t border-gray-200 dark:border-gray-800">
      <h4 className="font-black text-blue-900 dark:text-blue-100 font-['Work_Sans']">
        AathiraiNews CMS
      </h4>
      <div className="flex gap-8">
        <Link
          className="font-['Work_Sans'] text-xs text-slate-500 uppercase tracking-widest hover:text-blue-900 underline decoration-red-700 underline-offset-4 transition-opacity"
          href="#"
        >
          Privacy Policy
        </Link>
        <Link
          className="font-['Work_Sans'] text-xs text-slate-500 uppercase tracking-widest hover:text-blue-900 underline decoration-red-700 underline-offset-4 transition-opacity"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="font-['Work_Sans'] text-xs text-slate-500 uppercase tracking-widest hover:text-blue-900 underline decoration-red-700 underline-offset-4 transition-opacity"
          href="#"
        >
          Audit Log
        </Link>
      </div>
      <p className="font-['Work_Sans'] text-xs text-slate-500 uppercase tracking-widest">
        © 2024 AathiraiNews. Journalistic Integrity &amp; Modern Sophistication.
      </p>
    </footer>
  );
}
