import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { ParticleBackground } from "@/components/particle-background";
import { LoadingScreen } from "@/components/loading-screen";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Dylan Wo · PM",
  description: "Dylan Wo — Product Manager passionate about bridging design and data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="relative min-h-full flex flex-col overflow-x-hidden font-[family-name:var(--font-roboto)]">
        <LoadingScreen />
        <ParticleBackground />

        <Navbar />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
