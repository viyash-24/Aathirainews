import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "AathiraiNews | Journalistic Integrity & Modern Sophistication",
  description:
    "AathiraiNews delivers unfiltered, accurate, and rapid news to the Tamil-speaking global community. உலகெங்கிலும் வாழும் தமிழ் மக்களுக்குத் துல்லியமான செய்திகள்.",
  keywords: ["Tamil news", "AathiraiNews", "செய்திகள்", "தமிழ் செய்திகள்"],
  icons: {
    icon: "/aathirai_logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ta" className="light" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;600;700;900&family=Inter:wght@400;600;700&family=Mukta+Malar:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
