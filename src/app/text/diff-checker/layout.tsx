import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/diff-checker" },
    title: "Online Diff Checker - Compare Text and Find Differences",
    description: "Compare two pieces of text and find the differences instantly. Fast, free, and secure online diff checker for developers and writers. 100% private.",
    keywords: ["diff checker", "compare text", "text difference", "find differences", "WebToolNest", "text tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Diff Checker",
        description: "Compare text and find differences instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
