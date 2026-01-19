import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Word Counter - Count Words and Characters in Real-Time | ToolNest",
    description: "Free online word counter tool. Count words, characters, sentences, and paragraphs in real-time. Perfect for writers, students, and SEO professionals. 100% private.",
    keywords: ["word counter", "character count", "sentence counter", "text statistics", "online word count", "ToolNest", "text tools"],
    openGraph: {
        title: "Online Word Counter | ToolNest",
        description: "Analyze your text statistics instantly with our free word counter.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
