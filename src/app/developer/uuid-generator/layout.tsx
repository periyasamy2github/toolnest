import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/uuid-generator" },
    title: "UUID Generator - Generate Unique v4 UUIDs Instantly",
    description: "Generate unique UUIDs (v4) online for free. Create single or multiple UUIDs for your development projects. Fast, reliable, and 100% private.",
    keywords: ["uuid generator", "guid generator", "generate uuid v4", "online uuid", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online UUID Generator",
        description: "Generate unique UUIDs instantly for your projects.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
