import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SQL Formatter - Beautify and Format SQL Queries Online | ToolNest",
    description: "Format and beautify your SQL queries online. Supports various SQL dialects. Clean up messy SQL code for better readability and maintenance. 100% private.",
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
