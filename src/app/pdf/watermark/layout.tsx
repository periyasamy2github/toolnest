import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Watermark PDF - Add Text Watermarks to PDF",
    description: "Add custom text watermarks to your PDF files easily. Protect your documents with private, browser-side watermarking.",
    keywords: ["watermark pdf", "add watermark to pdf", "pdf security", "text watermark", "free pdf tools"],
};

export default function WatermarkLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
