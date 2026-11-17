import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/pdf/pdf-to-image" },
    title: "PDF to Image - Convert PDF Pages to JPG Online",
    description: "Convert your PDF pages into high-quality JPG images for free. 100% private, secure, and works directly in your browser.",
    keywords: ["pdf to image", "pdf to jpg", "convert pdf to image", "pdf to png", "free pdf tools"],
};

export default function PDFToImageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
