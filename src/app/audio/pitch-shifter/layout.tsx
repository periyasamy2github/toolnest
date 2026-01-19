import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pitch Shifter - Change Audio Pitch Online | ToolNest",
    description: "Change the pitch of your audio without affecting speed online for free. Adjust pitch of MP3, WAV, and other formats instantly. 100% private.",
    keywords: ["pitch shifter", "change audio pitch", "pitch changer", "audio pitch control", "ToolNest", "free audio tools"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
