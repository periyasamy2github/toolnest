import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online SQL Formatter - Pretty Print SQL Queries | ToolNest",
    description: "Format and beautify your SQL queries online. Supports various SQL dialects. Clean up messy SQL code for better readability.",
    keywords: ["sql formatter", "beautify sql", "format sql", "sql pretty printer", "developer tools", "ToolNest"],
    openGraph: {
        title: "Online SQL Formatter | ToolNest",
        description: "Format and beautify your SQL queries instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
