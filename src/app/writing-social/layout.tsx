import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/writing-social" },
    title: "Writing & Social Tools - Content Optimization & Social Media Growth",
    description: "Optimize your writing and boost your social media presence with our suite of content and social tools. Word counters, headline analyzers, hashtag generators, and more.",
    keywords: ["writing tools", "social media tools", "content optimization", "hashtag generator", "word counter", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Writing & Social Tools",
        description: "Professional tools for content creators and social media managers.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
