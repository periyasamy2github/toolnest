import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/social/tweet-generator" },
    title: "Tweet Generator",
    description: "Generate viral tweet ideas and threads using AI. Overcome writer's block instantly.",
    keywords: ["tweet generator", "twitter tools", "viral tweets", "twitter thread maker", "social media content"]
};

export default function TweetGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
