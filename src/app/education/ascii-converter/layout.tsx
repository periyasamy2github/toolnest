import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ASCII Converter - Convert Text to ASCII and Vice Versa | ToolNest",
    description: "Convert text to ASCII codes and ASCII codes back to text online for free. Fast, accurate, and 100% private.",
    keywords: ["ascii converter", "text to ascii", "ascii to text", "character codes", "ToolNest"],
};

export default function AsciiConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
