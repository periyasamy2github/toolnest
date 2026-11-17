import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/text-to-speech" },
    title: "Online Text to Speech - Convert Text to Audio Online",
    description: "Convert text into natural-sounding speech online for free. Supports multiple languages and voices. Download as MP3 or listen instantly. 100% private.",
    keywords: ["text to speech", "tts online", "convert text to audio", "speech synthesis", "WebToolNest", "text tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Text to Speech",
        description: "Convert your text into natural-sounding speech instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
