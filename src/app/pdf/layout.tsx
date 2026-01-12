import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "PDF Tools - Premium Suite for PDF Management",
    description: "A complete suite of powerful, private, and browser-based PDF tools. Merge, split, compress, rotate, and more. 100% private, no uploads.",
    keywords: ["pdf tools", "merge pdf", "split pdf", "compress pdf", "rotate pdf", "pdf to image", "image to pdf", "protect pdf", "unlock pdf"],
};

export default function PDFLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
