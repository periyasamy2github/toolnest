import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/json-to-ts" },
    title: "JSON to TypeScript - Convert JSON to TS Interfaces Instantly",
    description: "Convert JSON data to TypeScript interfaces and types instantly. Save time and improve type safety in your TypeScript projects. Fast, free, and private.",
    keywords: ["json to typescript", "json to ts", "typescript interface generator", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "JSON to TypeScript Converter",
        description: "Generate TypeScript interfaces from JSON data instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
