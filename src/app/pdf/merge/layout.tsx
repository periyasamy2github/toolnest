import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/pdf/merge" },
    title: "Merge PDF - Combine Multiple PDF Files into One",
    description: "Merge multiple PDF files into one document easily. Fast, secure, and 100% private. No file uploads, all processing happens locally in your browser.",
    keywords: ["merge pdf", "combine pdf", "join pdf", "pdf merger", "free pdf tools", "WebToolNest PDF tools"],
};

export default function MergeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
