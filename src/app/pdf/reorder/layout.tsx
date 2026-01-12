import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reorder PDF - Rearrange PDF Pages Online",
    description: "Rearrange the pages of your PDF document with a simple drag-and-drop interface. 100% private and secure browser-based tool.",
    keywords: ["reorder pdf", "rearrange pdf pages", "organize pdf", "pdf page order", "free pdf tools"],
};

export default function ReorderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
