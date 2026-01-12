import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Meme Generator - Create Custom Memes Free | ToolNest",
    description: "Create funny memes online for free with our easy-to-use meme generator. Upload your own images or use popular templates. Fast, free, and no watermark.",
    keywords: ["meme generator", "create memes", "online meme maker", "funny memes", "ToolNest", "free design tools"],
    openGraph: {
        title: "Online Meme Generator | ToolNest",
        description: "Create and download custom memes in seconds with our free tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
