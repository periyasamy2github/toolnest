import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YAML to JSON Converter | ToolNest",
    description: "Convert YAML configuration files to JSON and vice versa. Essential for DevOps and configuration management.",
};

export default function YamlJsonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
