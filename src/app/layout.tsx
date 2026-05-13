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
      <body className="min-h-full flex flex-col font-[family-name:var(--font-roboto)]">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
