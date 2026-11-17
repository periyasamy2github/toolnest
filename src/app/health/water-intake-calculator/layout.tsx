import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/water-intake-calculator" },
    title: "Water Intake Calculator - Daily Hydration Needs Online",
    description: "Calculate how much water you should drink daily based on your weight and activity level. Stay hydrated and healthy. 100% private.",
    keywords: ["water intake calculator", "daily water needs", "hydration calculator", "health tools", "WebToolNest", "drink water"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Water Intake Calculator",
        description: "Calculate your ideal daily water intake and stay hydrated.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
