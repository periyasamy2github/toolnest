import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/word-counter" },
    title: "Word Counter - Count Words and Characters in Real-Time",
    description: "Free online word counter tool. Count words, characters, sentences, and paragraphs in real-time. Perfect for writers, students, and SEO professionals. 100% private.",
    keywords: ["word counter", "character count", "sentence counter", "text statistics", "online word count", "WebToolNest", "text tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Word Counter",
        description: "Analyze your text statistics instantly with our free word counter.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
