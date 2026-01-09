import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Tools",
    description: "Professional, browser-based image editing tools. Compress, resize, crop, remove backgrounds, and extract color palettes 100% privately.",
    keywords: ["image compressor", "image resizer", "crop image", "remove background", "color palette extractor", "online image editor"],
};

export default function ImageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
