import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Life & Learning Tools - Health, Wellness & Education | ToolNest",
    description: "ToolNest provides simple and private health calculators, wellness exercises, and academic tools. BMI calculator, sleep cycles, breathing exercises, and GPA calculators. 100% private and browser-based.",
    keywords: [
        "bmi calculator", "body fat calculator", "breathing exercises",
        "calorie calculator", "water intake calculator", "health tools",
        "free health calculators", "online wellness tools", "ToolNest health tools",
        "gpa calculator", "grade calculator"
    ],
};

export default function HealthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
