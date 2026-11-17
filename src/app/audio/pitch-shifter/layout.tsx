import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/audio/pitch-shifter" },
    title: "Pitch Shifter - Change Audio Pitch Online",
    description: "Change the pitch of your audio without affecting speed online for free. Adjust pitch of MP3, WAV, and other formats instantly. 100% private.",
    keywords: ["pitch shifter", "change audio pitch", "pitch changer", "audio pitch control", "WebToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
