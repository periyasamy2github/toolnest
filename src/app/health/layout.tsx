import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Health & Wellness Tools",
    description: "Simple and private health calculators and exercises. BMI calculator, body fat estimator, breathing exercises, and calorie tracking.",
    keywords: ["bmi calculator", "body fat calculator", "breathing exercises", "calorie calculator", "water intake calculator", "health tools"],
};

export default function HealthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
