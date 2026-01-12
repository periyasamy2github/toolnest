import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audio Tools - Cut, Merge, and Edit Audio Online",
    description: "ToolNest provides fast and private audio editing in your browser. Cut MP3s, merge audio files, and more without uploading to a server. 100% private.",
    keywords: [
        "mp3 cutter", "audio merger", "online audio editor", "cut audio",
        "merge mp3", "free audio tools", "private audio editing", "ToolNest audio tools"
    ],
};

export default function AudioLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
