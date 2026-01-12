import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Page Numbers - Add Page Numbers to PDF Online",
    description: "Add page numbers to your PDF documents easily. Choose position and style. 100% private and secure browser-based tool.",
    keywords: ["add page numbers to pdf", "pdf page numbering", "paginate pdf", "pdf tools", "free pdf tools"],
};

export default function PageNumbersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
