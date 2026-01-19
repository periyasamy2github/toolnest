import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Volume Booster - Increase Audio Volume Online | ToolNest",
    description: "Increase the volume of your audio files online for free. Boost MP3, WAV, and other audio formats instantly. 100% private and secure.",
    keywords: ["volume booster", "increase audio volume", "boost mp3", "audio amplifier", "ToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
