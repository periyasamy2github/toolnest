import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Video & Social Media Downloader - Save Content Online | ToolNest",
    description: "Download videos and content from your favorite social media platforms for free. Fast, secure, and easy-to-use online downloader. 100% private.",
    keywords: ["video downloader", "social media downloader", "save video online", "free downloader", "ToolNest", "utility tools"],
};

export default function DownloaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
