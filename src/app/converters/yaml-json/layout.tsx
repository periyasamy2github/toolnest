import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/converters/yaml-json" },
    title: "YAML to JSON Converter",
    description: "Convert YAML configuration files to JSON and vice versa. Essential for DevOps and configuration management.",
};

export default function YamlJsonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
