import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fitness Age Calculator - How Fit Are You Really Online | ToolNest",
    description: "Calculate your fitness age based on your physical activity and health metrics. See how your body compares to your chronological age. 100% private.",
    keywords: ["fitness age", "calculate fitness", "health metrics", "body age", "health tools", "ToolNest"],
    openGraph: {
        title: "Fitness Age Calculator | ToolNest",
        description: "Discover your fitness age and improve your health status.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
