import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/meme-generator" },
    title: "Meme Generator - Create Viral Memes Online Without Watermark",
    description: "Create custom memes with text, images, and emojis. Multi-layer editing support. Fast, free, and no watermark. Make viral content instantly. 100% private.",
    keywords: ["meme generator", "make memes", "meme maker", "add text to image", "funny pictures", "WebToolNest", "viral content creator"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Meme Generator",
        description: "Create custom memes with our advanced multi-layer editor.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
