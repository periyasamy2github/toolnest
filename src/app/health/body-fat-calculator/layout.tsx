import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/body-fat-calculator" },
    title: "Body Fat Calculator - Calculate Body Fat Percentage Online",
    description: "Calculate your body fat percentage using the US Navy method. Get an estimate of your body composition and health status. 100% private.",
    keywords: ["body fat calculator", "calculate body fat", "body composition", "health tools", "WebToolNest", "fitness calculator"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Body Fat Calculator",
        description: "Calculate your body fat percentage and track your fitness progress.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
