import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Audio Merger - Combine MP3 & Audio Files | ToolNest",
    description: "Merge multiple audio files into one online for free. Support for MP3, WAV, and more. Fast, secure, and easy-to-use audio joiner. 100% private.",
    keywords: ["audio merger", "combine mp3", "join audio files", "mp3 joiner", "audio editor", "ToolNest", "free audio tools"],
    openGraph: {
        title: "Online Audio Merger | ToolNest",
        description: "Combine multiple audio files into one instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
