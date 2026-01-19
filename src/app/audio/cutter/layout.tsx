import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Audio Cutter - Trim MP3 and Audio Files Free | ToolNest",
    description: "Trim and cut your audio files online for free. Support for MP3, WAV, and more. Fast, secure, and easy-to-use audio trimmer. 100% private and browser-based.",
    keywords: ["audio cutter", "trim mp3", "cut audio online", "mp3 trimmer", "audio editor", "ToolNest", "free audio tools"],
    openGraph: {
        title: "Online Audio Cutter | ToolNest",
        description: "Trim and cut your audio files instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
