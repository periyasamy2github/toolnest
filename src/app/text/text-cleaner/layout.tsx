import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Text Cleaner - Remove Spaces, Lines & HTML | ToolNest",
    description: "Clean and format text instantly. Remove extra spaces, line breaks, HTML tags, and duplicates. Optimize content for SEO and readability.",
    keywords: ["text cleaner", "remove line breaks", "remove html tags", "clean text online", "remove extra spaces", "ToolNest", "text formatter"],
    openGraph: {
        title: "Free Online Text Cleaner | ToolNest",
        description: "Clean, format, and optimize your text instantly with our free tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
