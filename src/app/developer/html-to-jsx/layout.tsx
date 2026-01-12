import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HTML to JSX Converter - Online React Tool | ToolNest",
    description: "Convert HTML code to JSX instantly. Perfect for React developers. Handles class to className, style objects, and more. Fast and free.",
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
