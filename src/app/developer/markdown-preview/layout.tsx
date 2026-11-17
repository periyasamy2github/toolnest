import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/markdown-preview" },
    title: "Markdown Preview - Live Markdown Editor and Previewer",
    description: "Write and preview Markdown in real-time. Fast, free, and easy-to-use online Markdown editor with live preview. Perfect for developers and writers. 100% private.",
    keywords: ["markdown preview", "markdown editor", "online markdown", "live markdown", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Markdown Preview",
        description: "Write and preview Markdown instantly with our live editor.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
