import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/breathing-exercise" },
    title: "Guided Breathing Exercise - Relax and Reduce Stress Online",
    description: "Practice guided breathing exercises to reduce stress and anxiety. Simple, effective, and free online relaxation tool. 100% private.",
    keywords: ["breathing exercise", "stress relief", "relaxation tool", "guided breathing", "health tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Guided Breathing Exercise",
        description: "Take a moment to breathe and relax with our guided exercise.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
