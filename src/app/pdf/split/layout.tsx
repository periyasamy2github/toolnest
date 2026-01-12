import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Split PDF - Extract Pages from PDF Online",
    description: "Split your PDF files into multiple documents or extract specific pages easily. Secure, private, and fast browser-based tool.",
    keywords: ["split pdf", "extract pdf pages", "separate pdf", "pdf splitter", "free pdf tools"],
};

export default function SplitLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
