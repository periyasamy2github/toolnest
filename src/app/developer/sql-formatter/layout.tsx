import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/sql-formatter" },
    title: "SQL Formatter - Beautify and Format SQL Queries Online",
    description: "Format and beautify your SQL queries online. Supports various SQL dialects. Clean up messy SQL code for better readability and maintenance. 100% private.",
    keywords: ["sql formatter", "beautify sql", "format sql", "sql pretty printer", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online SQL Formatter",
        description: "Format and beautify your SQL queries instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
