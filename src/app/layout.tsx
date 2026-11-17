import { OG_IMAGE } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageFrame } from "@/components/Animations";
import { Search } from "@/components/Search";
import ScrollToTop from "@/components/ScrollToTop";
import { RevealObserver } from "@/components/Reveal";
import { LazyMotionProvider } from "@/components/LazyMotionProvider";
import { tools } from "@/data/tools";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

// self-hosted so the build never depends on fetching Google Fonts
const albert = localFont({
  src: "./fonts/AlbertSans-latin.woff2",
  variable: "--font-albert",
  weight: "400 600",
  display: "swap",
});

const description = `${tools.length} free online tools that run in your browser: compress images, merge PDFs, format JSON, calculate EMI and more. No sign-up, and your files never leave your device.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – ${tools.length} Free Online Tools That Run in Your Browser`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  applicationName: SITE_NAME,
  keywords: [
    "free online tools", "browser-based tools", "image compressor", "pdf merger",
    "json formatter", "background remover", "emi calculator", "unit converter",
    "qr code generator", "developer utilities", "private online tools", SITE_NAME,
  ],
  authors: [{ name: "Periyasamy S", url: "https://github.com/periyasamy2github" }],
  creator: "Periyasamy S",
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
        images: [OG_IMAGE],
    title: `${SITE_NAME} – ${tools.length} free tools that run in your browser`,
    description,
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – ${tools.length} free tools that run in your browser`,
    description,
  },
  icons: { icon: "/favicon.ico" },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      sameAs: ["https://github.com/periyasamy2github/toolnest"],
    },
  ],
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className="dark">
    <body className={`${albert.variable} antialiased bg-background text-foreground overflow-x-hidden flex flex-col min-h-screen`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      <LazyMotionProvider>
        <ScrollToTop />
        <RevealObserver />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-3 focus:rounded-[var(--radius)] focus:bg-accent focus:text-accent-ink focus:font-medium">
          Skip to content
        </a>
        <Navbar />
        <main id="main" tabIndex={-1} className="flex-grow outline-none">
          <PageFrame>{children}</PageFrame>
        </main>
        <Footer />
        <Search />
      </LazyMotionProvider>
    </body>
  </html>
);

export default RootLayout;
