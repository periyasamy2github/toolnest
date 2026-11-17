import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/readability" },
    title: "Readability Checker - Improve Your Writing Clarity Online",
    description: "Check the readability of your text using Flesch-Kincaid and other scores. Improve your writing for better audience engagement. Fast, free, and 100% private.",
    keywords: ["readability checker", "writing clarity", "flesch kincaid score", "content analysis", "WebToolNest", "text tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Readability Checker",
        description: "Make your writing easier to read and understand for everyone.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
