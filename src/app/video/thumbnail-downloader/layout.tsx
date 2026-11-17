import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/video/thumbnail-downloader" },
    title: "YouTube Thumbnail Downloader - Download HD YouTube Thumbnails",
    description: "Download high-quality thumbnails from any YouTube video. Supports 4K (MaxRes), HD (1080p), SD, and default sizes. Fast, free, and instant.",
    keywords: ["youtube thumbnail downloader", "download youtube thumbnail", "get youtube thumbnail", "youtube cover image", "thumbnail grabber"],
};

export default function ThumbnailDownloaderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
