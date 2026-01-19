import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calories Calculator - Daily Calorie Needs and Weight Loss | ToolNest",
    description: "Calculate your daily calorie needs based on your age, gender, weight, height, and activity level. Get personalized recommendations. 100% private.",
    keywords: ["calories calculator", "daily calorie needs", "weight loss calculator", "bmr calculator", "health tools", "ToolNest"],
    openGraph: {
        title: "Calories Calculator | ToolNest",
        description: "Calculate your daily calorie needs and reach your fitness goals.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
