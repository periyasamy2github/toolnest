import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/remove-bg" },
    title: "AI Background Remover - Remove Image Background Online Free",
    description: "Remove backgrounds from images instantly with AI. High-quality, transparent PNG output. No sign-up required, 100% free, secure, and private.",
    keywords: ["remove background", "bg remover", "transparent background", "AI background removal", "online bg remover", "WebToolNest", "free background remover"],
    openGraph: {
        images: [OG_IMAGE],
        title: "AI Background Remover",
        description: "Remove image backgrounds instantly with professional AI precision.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
