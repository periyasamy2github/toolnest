import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice Recorder - Record Audio Online Free Directly in Browser | ToolNest",
    description: "Record voice and audio directly in your browser. High-quality recording with visualizer. Save as WebM. No installation required. 100% private.",
    keywords: ["voice recorder", "online audio recorder", "record mp3", "microphone recorder", "sound recorder", "ToolNest", "free voice recording"],
    openGraph: {
        title: "Free Online Voice Recorder | ToolNest",
        description: "Record high-quality audio directly in your browser with our free tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
