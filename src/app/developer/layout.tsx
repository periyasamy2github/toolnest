import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Developer Utilities",
    description: "Essential tools for web developers. JSON formatter, SQL beautifier, YAML to JSON, HTML to JSX, JWT tools, and secure generators.",
    keywords: ["json formatter", "sql formatter", "html to jsx", "yaml to json", "jwt decoder", "uuid generator", "password generator", "regex tester"],
};

export default function DeveloperLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
