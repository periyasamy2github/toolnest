import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/fitness-age" },
    title: "Fitness Age Calculator - How Fit Are You Really Online",
    description: "Calculate your fitness age based on your physical activity and health metrics. See how your body compares to your chronological age. 100% private.",
    keywords: ["fitness age", "calculate fitness", "health metrics", "body age", "health tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Fitness Age Calculator",
        description: "Discover your fitness age and improve your health status.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
