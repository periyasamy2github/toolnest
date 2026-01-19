import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Instagram Hashtag Generator | ToolNest",
    description: "Find trending and popular Instagram hashtags to increase your reach and engagement.",
    keywords: ["instagram hashtags", "hashtag generator", "instagram growth", "social media marketing", "trending hashtags"]
};

export default function InstagramHashtagGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
