import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Headline Analyzer - Write Catchy & SEO-Friendly Headlines | ToolNest",
    description: "Analyze your headlines for SEO, emotional impact, and readability. Improve your click-through rates with our free online headline analyzer.",
    keywords: ["headline analyzer", "title analyzer", "seo headlines", "content marketing", "ToolNest", "text tools"],
    openGraph: {
        title: "Headline Analyzer | ToolNest",
        description: "Write better headlines that drive more traffic to your content.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
