import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToolNest - All Your Everyday Tools in One Place",
  description: "A unified suite of web tools for media, images, and more. All Your Everyday Tools in One Place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 overflow-x-hidden`}
      >
        <Navbar />
        <main className="min-h-screen transition-all duration-300">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-7xl">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
