import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GooeyNav from "@/components/ui/GooeyNav";
import { TickerStrip } from "@/components/layout/TickerStrip";
import { Footer } from "@/components/layout/Footer";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Global Finance IN | Financial Intelligence Platform",
  description: "Your premier destination for global financial news, market data, and investment tools. Real-time stock indices, forex, crypto, and macro economic insights.",
  keywords: ["finance", "stock market", "crypto", "forex", "news", "investment", "trading"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    { label: "LTP", href: "/ltp-calculator" },
    { label: "FGA", href: "/ai-voice" },
    { label: "About", href: "/about" },
    { label: "Admin", href: "/admin/dashboard" },
    { label: "Login", href: "/auth/login" },
  ];

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        <NextAuthProvider>
          <TickerStrip />
          <div className="relative z-50">
            <GooeyNav items={navItems} />
          </div>
          <main className="flex-1">{children}</main>
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
