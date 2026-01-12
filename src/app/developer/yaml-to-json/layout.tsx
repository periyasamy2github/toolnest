import { Metadata } from "next";

export const metadata: Metadata = {
    title: "YAML to JSON Converter - Online Dev Tool | ToolNest",
    description: "Convert YAML to JSON and vice versa instantly. Fast, free, and secure online converter for developers. Handles complex YAML structures.",
    keywords: ["yaml to json", "json to yaml", "yaml converter", "developer tools", "ToolNest"],
    openGraph: {
        title: "YAML to JSON Converter | ToolNest",
        description: "Convert between YAML and JSON formats instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
