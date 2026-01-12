import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compress PDF - Reduce PDF File Size Online",
    description: "Compress your PDF files to reduce file size while maintaining quality. 100% private, secure, and works directly in your browser.",
    keywords: ["compress pdf", "reduce pdf size", "shrink pdf", "pdf optimizer", "free pdf tools"],
};

export default function CompressLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
