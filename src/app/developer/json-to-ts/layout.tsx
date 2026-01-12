import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON to TypeScript Converter - Online Dev Tool | ToolNest",
    description: "Convert JSON data to TypeScript interfaces and types instantly. Save time and improve type safety in your TypeScript projects. Fast and free.",
    keywords: ["json to typescript", "json to ts", "typescript interface generator", "developer tools", "ToolNest"],
    openGraph: {
        title: "JSON to TypeScript Converter | ToolNest",
        description: "Generate TypeScript interfaces from JSON data instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
