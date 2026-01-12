import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Health & Wellness Tools - Calculate BMI, Body Fat, and More Online",
    description: "ToolNest provides simple and private health calculators and exercises. BMI calculator, body fat estimator, breathing exercises, and calorie tracking. 100% private and browser-based.",
    keywords: [
        "bmi calculator", "body fat calculator", "breathing exercises",
        "calorie calculator", "water intake calculator", "health tools",
        "free health calculators", "online wellness tools", "ToolNest health tools"
    ],
};

export default function HealthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
