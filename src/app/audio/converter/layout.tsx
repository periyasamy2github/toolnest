import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/audio/converter" },
    title: "Audio Converter - Convert MP3, WAV, OGG, and More Online",
    description: "Convert audio files between MP3, WAV, OGG, and more instantly. Free online audio converter with no file size limits. 100% private and secure.",
    keywords: ["audio converter", "convert mp3", "wav converter", "ogg converter", "audio format converter", "WebToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
