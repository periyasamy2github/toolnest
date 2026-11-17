import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/audio/merger" },
    title: "Online Audio Merger - Combine MP3 and Audio Files Online",
    description: "Merge multiple audio files into one online for free. Support for MP3, WAV, and more. Fast, secure, and easy-to-use audio joiner. 100% private.",
    keywords: ["audio merger", "combine mp3", "join audio files", "mp3 joiner", "audio editor", "WebToolNest", "free audio tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Audio Merger",
        description: "Combine multiple audio files into one instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
