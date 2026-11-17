import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/pdf" },
    title: "PDF Utilities - Merge, Split, and Compress PDFs Online",
    description: "A complete suite of powerful, private, and browser-based PDF tools. Merge, split, compress, rotate, and protect PDFs. 100% private, no uploads, all processing happens locally.",
    keywords: ["pdf tools", "merge pdf", "split pdf", "compress pdf", "rotate pdf", "pdf to image", "image to pdf", "protect pdf", "unlock pdf", "WebToolNest PDF tools"],
};

export default function PDFLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
