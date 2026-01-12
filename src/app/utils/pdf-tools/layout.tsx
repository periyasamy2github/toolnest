import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PDF Tools - Merge, Split & Compress PDFs Online | ToolNest",
    description: "Merge multiple PDFs, split pages, and compress file size. All processing happens in your browser. Free, private, no upload to servers.",
    keywords: ["pdf tools", "merge pdf", "split pdf", "compress pdf", "combine pdf", "pdf merger", "ToolNest"],
    openGraph: {
        title: "PDF Tools | ToolNest",
        description: "Merge, split, and compress PDFs directly in your browser. 100% private.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
