import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Guided Breathing Exercise - Relax and Reduce Stress Online | ToolNest",
    description: "Practice guided breathing exercises to reduce stress and anxiety. Simple, effective, and free online relaxation tool. 100% private.",
    keywords: ["breathing exercise", "stress relief", "relaxation tool", "guided breathing", "health tools", "ToolNest"],
    openGraph: {
        title: "Guided Breathing Exercise | ToolNest",
        description: "Take a moment to breathe and relax with our guided exercise.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
