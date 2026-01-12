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
    default: "ToolNest - The Ultimate All-in-One Digital Toolbox",
    template: "%s | ToolNest"
  },
  description: "ToolNest is a unified suite of powerful, private, and browser-based web tools for developers, creators, and everyday tasks. 100% private, no uploads, no limits.",
  keywords: [
    "web tools", "online tools", "image compressor", "background remover",
    "json formatter", "jwt tool", "unit converter", "qr code generator",
    "uptime monitoring", "developer utilities", "productivity tools",
    "text tools", "audio tools", "health calculators", "free online tools",
    "private web tools", "browser-based tools", "ToolNest"
  ],
  authors: [{ name: "Professor", url: "https://t.me/hey_mrprofessor" }],
  creator: "Professor",
  publisher: "ToolNest",
  metadataBase: new URL("https://webtoolnest.vercel.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "ToolNest - The Ultimate All-in-One Digital Toolbox",
    description: "Powerful, private, and browser-based tools for everyone. Media, developers, and everyday tasks. 100% private.",
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
    title: "ToolNest - The Ultimate All-in-One Digital Toolbox",
    description: "Powerful, private, and browser-based tools for everyone. Media, developers, and everyday tasks. 100% private.",
    images: ["/og-image.png"],
    creator: "@hey_mrprofessor",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    google: "your-google-verification-code", // User should replace this
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
