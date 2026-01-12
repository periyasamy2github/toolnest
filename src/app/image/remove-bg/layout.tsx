import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Background Remover - Remove Image Background Online Free | ToolNest",
    description: "Remove backgrounds from images instantly with AI. High-quality, transparent PNG output. No sign-up required, 100% free and secure.",
    keywords: ["remove background", "bg remover", "transparent background", "AI background removal", "online bg remover", "ToolNest", "free background remover"],
    openGraph: {
        title: "AI Background Remover | ToolNest",
        description: "Remove image backgrounds instantly with professional AI precision.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
