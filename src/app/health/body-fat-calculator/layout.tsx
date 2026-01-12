import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Body Fat Calculator - Calculate Body Fat Percentage | ToolNest",
    description: "Calculate your body fat percentage using the US Navy method. Get an estimate of your body composition and health status.",
    keywords: ["body fat calculator", "calculate body fat", "body composition", "health tools", "ToolNest", "fitness calculator"],
    openGraph: {
        title: "Body Fat Calculator | ToolNest",
        description: "Calculate your body fat percentage and track your fitness progress.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
