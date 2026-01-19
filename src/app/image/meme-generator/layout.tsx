import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Meme Generator - Create Viral Memes Online Without Watermark | ToolNest",
    description: "Create custom memes with text, images, and emojis. Multi-layer editing support. Fast, free, and no watermark. Make viral content instantly. 100% private.",
    keywords: ["meme generator", "make memes", "meme maker", "add text to image", "funny pictures", "ToolNest", "viral content creator"],
    openGraph: {
        title: "Free Online Meme Generator | ToolNest",
        description: "Create custom memes with our advanced multi-layer editor.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
