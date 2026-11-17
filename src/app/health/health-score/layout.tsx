import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/health-score" },
    title: "Health Score Calculator - Assess Your Overall Wellness Online",
    description: "Get an estimate of your overall health and wellness score based on various lifestyle and physical metrics. 100% private and secure.",
    keywords: ["health score", "wellness calculator", "health assessment", "fitness score", "health tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Health Score Calculator",
        description: "Assess your overall wellness and get insights into your health status.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
