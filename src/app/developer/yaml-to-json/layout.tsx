import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/yaml-to-json" },
    title: "YAML to JSON Converter - Convert YAML to JSON Instantly",
    description: "Convert YAML to JSON and vice versa instantly. Fast, free, and secure online converter for developers. Handles complex YAML structures with ease.",
    keywords: ["yaml to json", "json to yaml", "yaml converter", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "YAML to JSON Converter",
        description: "Convert between YAML and JSON formats instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
