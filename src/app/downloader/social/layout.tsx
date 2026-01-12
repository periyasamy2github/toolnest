import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Social Media Downloader - Save Posts & Stories | ToolNest",
    description: "Download posts, stories, and reels from popular social media platforms online for free. Fast, secure, and easy to use. 100% private.",
    keywords: ["social media downloader", "save instagram posts", "download facebook videos", "social media tools", "ToolNest"],
    openGraph: {
        title: "Social Media Downloader | ToolNest",
        description: "Save your favorite social media content instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
