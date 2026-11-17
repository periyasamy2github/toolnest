import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/calories-calculator" },
    title: "Calories Calculator - Daily Calorie Needs and Weight Loss",
    description: "Calculate your daily calorie needs based on your age, gender, weight, height, and activity level. Get personalized recommendations. 100% private.",
    keywords: ["calories calculator", "daily calorie needs", "weight loss calculator", "bmr calculator", "health tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Calories Calculator",
        description: "Calculate your daily calorie needs and reach your fitness goals.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
