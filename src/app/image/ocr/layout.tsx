import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/ocr" },
    title: "Image to Text (OCR) - Extract Text from Images Online",
    description: "Extract text from images using advanced OCR technology. Support for multiple languages. Fast, accurate, and 100% private.",
    keywords: ["image to text", "ocr online", "extract text from image", "optical character recognition", "WebToolNest", "free ocr tool"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
