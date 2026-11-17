import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/text/lorem-ipsum" },
    title: "Lorem Ipsum Generator - Generate Placeholder Text",
    description: "Generate custom Lorem Ipsum placeholder text for your designs and layouts. Choose number of paragraphs, sentences, or words. Fast and free.",
    keywords: ["lorem ipsum generator", "placeholder text", "dummy text", "lipsum generator", "design tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Lorem Ipsum Generator",
        description: "Generate perfect placeholder text for your next project.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
