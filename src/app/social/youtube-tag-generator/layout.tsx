import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YouTube Tag Generator | ToolNest",
    description: "Generate high-ranking YouTube tags for your videos. Boost your SEO and get more views.",
    keywords: ["youtube tags", "youtube seo", "tag generator", "video tags", "youtube keywords"]
};

export default function YouTubeTagGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
