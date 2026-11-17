import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/audio/cutter" },
    title: "Online Audio Cutter - Trim MP3 and Audio Files Free",
    description: "Trim and cut your audio files online for free. Support for MP3, WAV, and more. Fast, secure, and easy-to-use audio trimmer. 100% private and browser-based.",
    keywords: ["audio cutter", "trim mp3", "cut audio online", "mp3 trimmer", "audio editor", "WebToolNest", "free audio tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Audio Cutter",
        description: "Trim and cut your audio files instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
