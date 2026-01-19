import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON Formatter - Beautify, Validate, and Minify JSON | ToolNest",
    description: "Format, validate, and minify your JSON data online. Clean up messy JSON, find syntax errors, and optimize for production. 100% private and secure.",
    keywords: ["json formatter", "json validator", "pretty print json", "minify json", "json editor", "ToolNest", "developer tools"],
    openGraph: {
        title: "JSON Formatter & Validator | ToolNest",
        description: "Format and validate your JSON data with ease. Secure and private.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
