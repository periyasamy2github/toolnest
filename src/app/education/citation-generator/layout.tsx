import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Citation Generator - Create APA, MLA and Chicago Citations | ToolNest",
    description: "Generate accurate citations in APA, MLA, and Chicago styles for books, websites, and journals. 100% private and free.",
    keywords: ["citation generator", "apa citation", "mla citation", "chicago citation", "bibliography tool", "ToolNest"],
};

export default function CitationGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
