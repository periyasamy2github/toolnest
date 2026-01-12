import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Tools - Compress, Resize, and Edit Images Online",
    description: "ToolNest offers a suite of professional, browser-based image editing tools. Compress, resize, crop, remove backgrounds, and extract color palettes 100% privately. No uploads required.",
    keywords: [
        "image compressor", "image resizer", "crop image", "remove background",
        "color palette extractor", "online image editor", "free image tools",
        "private image editing", "ToolNest image tools"
    ],
};

export default function ImageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
