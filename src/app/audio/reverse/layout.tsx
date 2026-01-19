import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reverse Audio - Play Audio Backwards Online | ToolNest",
    description: "Play your audio files backwards online for free. Create unique sound effects by reversing MP3, WAV, and more. 100% private and secure.",
    keywords: ["reverse audio", "audio reverser", "play backwards", "mp3 reverser", "sound effects", "ToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
