import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Markdown Preview - Live Markdown Editor and Previewer | ToolNest",
    description: "Write and preview Markdown in real-time. Fast, free, and easy-to-use online Markdown editor with live preview. Perfect for developers and writers. 100% private.",
    keywords: ["markdown preview", "markdown editor", "online markdown", "live markdown", "developer tools", "ToolNest"],
    openGraph: {
        title: "Online Markdown Preview | ToolNest",
        description: "Write and preview Markdown instantly with our live editor.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
