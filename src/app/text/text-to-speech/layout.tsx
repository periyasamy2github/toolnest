import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Text to Speech - Convert Text to Audio Online | ToolNest",
    description: "Convert text into natural-sounding speech online for free. Supports multiple languages and voices. Download as MP3 or listen instantly. 100% private.",
    keywords: ["text to speech", "tts online", "convert text to audio", "speech synthesis", "ToolNest", "text tools"],
    openGraph: {
        title: "Online Text to Speech | ToolNest",
        description: "Convert your text into natural-sounding speech instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
