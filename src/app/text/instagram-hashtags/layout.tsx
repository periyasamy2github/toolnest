import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Instagram Hashtag Generator - Find Trending Hashtags Online | ToolNest",
    description: "Generate trending and relevant hashtags for your Instagram posts. Increase your reach and engagement with our free hashtag generator. 100% private.",
    keywords: ["instagram hashtags", "hashtag generator", "trending hashtags", "social media tools", "ToolNest"],
    openGraph: {
        title: "Instagram Hashtag Generator | ToolNest",
        description: "Find the best hashtags to grow your Instagram presence.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
