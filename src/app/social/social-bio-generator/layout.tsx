import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Social Bio Generator | ToolNest",
    description: "Create professional and creative bios for Instagram, Twitter, LinkedIn, and TikTok.",
    keywords: ["bio generator", "instagram bio", "twitter bio", "linkedin summary", "social media profile"]
};

export default function SocialBioGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
