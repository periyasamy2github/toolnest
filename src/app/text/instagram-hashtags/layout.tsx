import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/instagram-hashtags" },
    title: "Instagram Hashtag Generator - Find Trending Hashtags Online",
    description: "Generate trending and relevant hashtags for your Instagram posts. Increase your reach and engagement with our free hashtag generator. 100% private.",
    keywords: ["instagram hashtags", "hashtag generator", "trending hashtags", "social media tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Instagram Hashtag Generator",
        description: "Find the best hashtags to grow your Instagram presence.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
