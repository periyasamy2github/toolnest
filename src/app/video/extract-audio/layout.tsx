import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Extract Audio from Video - Video to MP3 Converter Online | ToolNest",
    description: "Extract high-quality MP3 audio from video files instantly. Supports MP4, AVI, MOV, and more. Fast, free, and 100% private.",
    keywords: ["extract audio", "video to mp3", "audio extractor", "mp4 to mp3", "video sound extractor"]
};

export default function ExtractAudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
