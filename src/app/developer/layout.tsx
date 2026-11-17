import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer" },
    title: "Dev Tools & Converters - Format, Convert, and Debug Code",
    description: "Essential utilities for developers and universal data converters. JSON formatter, SQL beautifier, YAML to JSON, HTML to JSX, JWT tools, and secure generators. 100% private and browser-based.",
    keywords: [
        "json formatter", "sql formatter", "html to jsx", "yaml to json",
        "jwt decoder", "uuid generator", "password generator", "regex tester",
        "free developer tools", "online code formatter", "WebToolNest developer tools",
        "json to csv", "number base converter"
    ],
};

export default function DeveloperLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
