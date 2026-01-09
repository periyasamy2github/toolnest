import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SupportButton } from "@/components/SupportButton";
import { PageTransition } from "@/components/Animations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ToolNest - All Your Everyday Tools in One Place",
    template: "%s | ToolNest"
  },
  description: "A unified suite of powerful, private, and browser-based web tools for media, images, developers, and more. No uploads, no limits, 100% private.",
  keywords: [
    "web tools", "online tools", "image compressor", "background remover",
    "json formatter", "jwt tool", "unit converter", "qr code generator",
    "uptime monitoring", "developer utilities", "productivity tools",
    "text tools", "audio tools", "health calculators"
  ],
  authors: [{ name: "Professor", url: "https://t.me/hey_mrprofessor" }],
  creator: "Professor",
  publisher: "ToolNest",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ToolNest - All Your Everyday Tools in One Place",
    description: "Powerful, private, and browser-based tools for everyone. Media, developers, and everyday tasks.",
    url: "https://webtoolnest.vercel.app",
    siteName: "ToolNest",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolNest - The Ultimate Digital Toolbox",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolNest - All Your Everyday Tools in One Place",
    description: "Powerful, private, and browser-based tools for everyone. Media, developers, and everyday tasks.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100 overflow-x-hidden flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow transition-all duration-300">
          <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 max-w-[1440px]">
            <PageTransition>
              {children}
            </PageTransition>
          </div>
        </main>
        <Footer />
        <SupportButton />
      </body>
    </html>
  );
}
