import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Water Intake Calculator - Daily Hydration Needs Online | ToolNest",
    description: "Calculate how much water you should drink daily based on your weight and activity level. Stay hydrated and healthy. 100% private.",
    keywords: ["water intake calculator", "daily water needs", "hydration calculator", "health tools", "ToolNest", "drink water"],
    openGraph: {
        title: "Water Intake Calculator | ToolNest",
        description: "Calculate your ideal daily water intake and stay hydrated.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
