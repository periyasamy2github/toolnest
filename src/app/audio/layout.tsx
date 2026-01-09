import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audio Tools",
    description: "Fast and private audio editing in your browser. Cut MP3s, merge audio files, and more without uploading to a server.",
    keywords: ["mp3 cutter", "audio merger", "online audio editor", "cut audio", "merge mp3"],
};

export default function AudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
