import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Health Score Calculator - Assess Your Overall Wellness Online | ToolNest",
    description: "Get an estimate of your overall health and wellness score based on various lifestyle and physical metrics. 100% private and secure.",
    keywords: ["health score", "wellness calculator", "health assessment", "fitness score", "health tools", "ToolNest"],
    openGraph: {
        title: "Health Score Calculator | ToolNest",
        description: "Assess your overall wellness and get insights into your health status.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
