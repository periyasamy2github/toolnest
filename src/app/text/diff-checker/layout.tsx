import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Diff Checker - Compare Text and Find Differences | ToolNest",
    description: "Compare two pieces of text and find the differences instantly. Fast, free, and secure online diff checker for developers and writers. 100% private.",
    keywords: ["diff checker", "compare text", "text difference", "find differences", "ToolNest", "text tools"],
    openGraph: {
        title: "Online Diff Checker | ToolNest",
        description: "Compare text and find differences instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
