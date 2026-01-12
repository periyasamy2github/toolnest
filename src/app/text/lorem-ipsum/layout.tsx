import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lorem Ipsum Generator - Generate Placeholder Text | ToolNest",
    description: "Generate custom Lorem Ipsum placeholder text for your designs and layouts. Choose number of paragraphs, sentences, or words. Fast and free.",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text", "lipsum generator", "design tools", "ToolNest"],
    openGraph: {
        title: "Lorem Ipsum Generator | ToolNest",
        description: "Generate perfect placeholder text for your next project.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
