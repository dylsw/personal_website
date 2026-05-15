import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Dylan Wo",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="relative min-h-full flex flex-col overflow-x-hidden font-[family-name:var(--font-roboto)]">
        {/* Aurora streaks */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          {/* Teal — primary band */}
          <div style={{
            position: 'absolute', top: '28%', left: '-30%',
            width: '220%', height: '80px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.0) 10%, rgba(45,212,191,0.6) 30%, rgba(16,185,129,0.72) 50%, rgba(45,212,191,0.6) 70%, rgba(45,212,191,0.0) 90%, transparent 100%)',
            filter: 'blur(32px)',
            animation: 'streak-1 11s ease-in-out infinite',
          }} />
          {/* Violet */}
          <div style={{
            position: 'absolute', top: '18%', left: '-20%',
            width: '200%', height: '60px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.0) 10%, rgba(139,92,246,0.52) 35%, rgba(167,139,250,0.65) 55%, rgba(139,92,246,0.52) 75%, rgba(139,92,246,0.0) 90%, transparent 100%)',
            filter: 'blur(28px)',
            animation: 'streak-2 15s ease-in-out infinite',
          }} />
          {/* Rose */}
          <div style={{
            position: 'absolute', top: '46%', left: '-25%',
            width: '210%', height: '50px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(251,113,133,0.0) 15%, rgba(251,113,133,0.48) 38%, rgba(244,63,94,0.58) 55%, rgba(251,113,133,0.48) 72%, rgba(251,113,133,0.0) 88%, transparent 100%)',
            filter: 'blur(24px)',
            animation: 'streak-3 9s ease-in-out infinite',
          }} />
          {/* Deep indigo — upper glow */}
          <div style={{
            position: 'absolute', top: '8%', left: '-35%',
            width: '230%', height: '70px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.0) 12%, rgba(99,102,241,0.48) 32%, rgba(129,140,248,0.6) 52%, rgba(99,102,241,0.48) 72%, rgba(99,102,241,0.0) 90%, transparent 100%)',
            filter: 'blur(36px)',
            animation: 'streak-4 17s ease-in-out infinite',
          }} />
          {/* Emerald — lower accent */}
          <div style={{
            position: 'absolute', top: '62%', left: '-20%',
            width: '200%', height: '55px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.0) 10%, rgba(52,211,153,0.5) 30%, rgba(16,185,129,0.62) 52%, rgba(52,211,153,0.5) 72%, rgba(52,211,153,0.0) 90%, transparent 100%)',
            filter: 'blur(28px)',
            animation: 'streak-5 13s ease-in-out infinite',
          }} />
        </div>

        <Navbar />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
