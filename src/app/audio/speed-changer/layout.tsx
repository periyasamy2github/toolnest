import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audio Speed Changer - Change Audio Speed Online | ToolNest",
    description: "Speed up or slow down your audio files online for free. Change playback speed of MP3, WAV, and other formats without losing pitch. 100% private.",
    keywords: ["audio speed changer", "change audio speed", "speed up mp3", "slow down audio", "audio playback speed", "ToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
