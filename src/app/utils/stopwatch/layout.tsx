import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Stopwatch - Simple & Accurate Timer | ToolNest",
    description: "A simple, accurate, and easy-to-use online stopwatch with lap timing. Perfect for sports, cooking, studying, and more. Fast and free.",
    keywords: ["online stopwatch", "stopwatch with laps", "accurate timer", "utility tools", "ToolNest"],
    openGraph: {
        title: "Online Stopwatch | ToolNest",
        description: "Track time accurately with our simple online stopwatch.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
