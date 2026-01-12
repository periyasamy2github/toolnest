import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text & Content Tools - Word Counter, Case Converter, and More Online",
    description: "ToolNest offers powerful text manipulation and analysis tools. Word counter, case converter, lorem ipsum generator, diff checker, and more. 100% private and browser-based.",
    keywords: [
        "word counter", "case converter", "lorem ipsum generator", "diff checker",
        "text analysis", "headline analyzer", "readability score", "free text tools",
        "online content tools", "ToolNest text tools"
    ],
};

export default function TextLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
