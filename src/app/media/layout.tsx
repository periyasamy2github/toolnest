import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/media" },
    title: "Media Tools - Edit Image, Video, and Audio Online",
    description: "A comprehensive suite of media tools to edit, compress, and convert images, videos, and audio files directly in your browser. Fast, secure, and private.",
    keywords: ["media tools", "image editor", "video compressor", "audio cutter", "online media tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Media Tools",
        description: "Professional-grade image, video, and audio tools in one place.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
