import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/audio/reverse" },
    title: "Reverse Audio - Play Audio Backwards Online",
    description: "Play your audio files backwards online for free. Create unique sound effects by reversing MP3, WAV, and more. 100% private and secure.",
    keywords: ["reverse audio", "audio reverser", "play backwards", "mp3 reverser", "sound effects", "WebToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
