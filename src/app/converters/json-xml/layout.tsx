import { Metadata } from "next";

export const metadata: Metadata = {
    title: "JSON to XML Converter | ToolNest",
    description: "Convert JSON data to XML and vice versa. Free, secure, and client-side conversion for developers and API integrations.",
};

export default function JsonXmlLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
