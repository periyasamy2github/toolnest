import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HTML to JSX Converter - Convert HTML to React JSX | ToolNest",
    description: "Convert HTML code to JSX instantly. Perfect for React developers. Handles class to className, style objects, and more. Fast, free, and private.",
    keywords: ["html to jsx", "react converter", "html to react", "jsx generator", "developer tools", "ToolNest"],
    openGraph: {
        title: "HTML to JSX Converter | ToolNest",
        description: "Convert your HTML to JSX for React projects in seconds.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
