import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text & Content Tools",
    description: "Powerful text manipulation and analysis tools. Word counter, case converter, lorem ipsum generator, diff checker, and more.",
    keywords: ["word counter", "case converter", "lorem ipsum generator", "diff checker", "text analysis", "headline analyzer", "readability score"],
};

export default function TextLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
