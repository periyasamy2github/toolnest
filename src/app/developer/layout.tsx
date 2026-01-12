import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Developer Utilities - Format, Convert, and Debug Code Online",
    description: "ToolNest offers essential utilities for web developers. JSON formatter, SQL beautifier, YAML to JSON, HTML to JSX, JWT tools, and secure generators. 100% private and browser-based.",
    keywords: [
        "json formatter", "sql formatter", "html to jsx", "yaml to json",
        "jwt decoder", "uuid generator", "password generator", "regex tester",
        "free developer tools", "online code formatter", "ToolNest developer tools"
    ],
};

export default function DeveloperLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
