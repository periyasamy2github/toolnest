import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/pdf/remove-pages" },
    title: "Remove Pages - Delete Pages from PDF Online",
    description: "Select and remove unwanted pages from your PDF document easily. 100% private and secure browser-based tool.",
    keywords: ["remove pages from pdf", "delete pdf pages", "extract pdf", "pdf page remover", "free pdf tools"],
};

export default function RemovePagesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
