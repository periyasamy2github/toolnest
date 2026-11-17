import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/converters/json-csv" },
    title: "JSON to CSV Converter",
    description: "Convert JSON data to CSV and vice versa. Free, secure, and client-side conversion for developers and data analysts.",
};

export default function JsonCsvLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
