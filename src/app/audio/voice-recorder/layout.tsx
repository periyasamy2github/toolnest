import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/audio/voice-recorder" },
    title: "Voice Recorder - Record Audio Online Free Directly in Browser",
    description: "Record voice and audio directly in your browser. High-quality recording with visualizer. Save as WebM. No installation required. 100% private.",
    keywords: ["voice recorder", "online audio recorder", "record mp3", "microphone recorder", "sound recorder", "WebToolNest", "free voice recording"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Voice Recorder",
        description: "Record high-quality audio directly in your browser with our free tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
