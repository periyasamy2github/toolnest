import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image to PDF - Convert JPG, PNG to PDF Online",
    description: "Convert your images (JPG, PNG, etc.) to a single PDF document easily. Fast, secure, and 100% private browser-based conversion.",
    keywords: ["image to pdf", "jpg to pdf", "png to pdf", "convert image to pdf", "free pdf tools"],
};

export default function ImageToPDFLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
