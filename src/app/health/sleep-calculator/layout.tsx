import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/sleep-calculator" },
    title: "Sleep Calculator - Calculate Sleep Cycles and Wake Up Time",
    description: "Calculate the best time to go to sleep or wake up. Based on 90-minute sleep cycles. Wake up feeling refreshed and energized. 100% private.",
    keywords: ["sleep calculator", "sleep cycles", "wake up time", "bedtime calculator", "sleep cycle calculator", "WebToolNest", "health tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Sleep Cycle Calculator",
        description: "Calculate your perfect sleep schedule for better rest and energy.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
