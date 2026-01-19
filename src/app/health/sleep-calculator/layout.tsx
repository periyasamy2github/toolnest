import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sleep Calculator - Calculate Sleep Cycles and Wake Up Time | ToolNest",
    description: "Calculate the best time to go to sleep or wake up. Based on 90-minute sleep cycles. Wake up feeling refreshed and energized. 100% private.",
    keywords: ["sleep calculator", "sleep cycles", "wake up time", "bedtime calculator", "sleep cycle calculator", "ToolNest", "health tools"],
    openGraph: {
        title: "Free Online Sleep Cycle Calculator | ToolNest",
        description: "Calculate your perfect sleep schedule for better rest and energy.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
