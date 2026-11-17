import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/html-to-jsx" },
    title: "HTML to JSX Converter - Convert HTML to React JSX",
    description: "Convert HTML code to JSX instantly. Perfect for React developers. Handles class to className, style objects, and more. Fast, free, and private.",
    keywords: ["html to jsx", "react converter", "html to react", "jsx generator", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "HTML to JSX Converter",
        description: "Convert your HTML to JSX for React projects in seconds.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
