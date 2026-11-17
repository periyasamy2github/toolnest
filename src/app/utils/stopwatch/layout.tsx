import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/stopwatch" },
    title: "Online Stopwatch - Simple and Accurate Timer Online",
    description: "A simple, accurate, and easy-to-use online stopwatch with lap timing. Perfect for sports, cooking, studying, and more. 100% private and free.",
    keywords: ["online stopwatch", "stopwatch with laps", "accurate timer", "utility tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Stopwatch",
        description: "Track time accurately with our simple online stopwatch.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
