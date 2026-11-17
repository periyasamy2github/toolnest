import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/keyword-density" },
    title: "Keyword Density Checker - Optimize Your Content for SEO",
    description: "Check the keyword density of your text or web page. Identify over-optimized keywords and improve your search engine rankings. Fast, free, and 100% private.",
    keywords: ["keyword density", "seo checker", "keyword analysis", "content optimization", "WebToolNest", "text tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Keyword Density Checker",
        description: "Analyze your content's keyword density for better SEO results.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
