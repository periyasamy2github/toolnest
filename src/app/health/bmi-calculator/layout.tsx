import { Metadata } from "next";

export const metadata: Metadata = {
    title: "BMI Calculator - Calculate Body Mass Index (Metric & Imperial) | ToolNest",
    description: "Calculate your Body Mass Index (BMI) easily. Supports Metric and Imperial units, with specific standards for Asian/Indian populations. Track your health status.",
    keywords: ["bmi calculator", "body mass index", "calculate bmi", "health calculator", "weight status", "ToolNest", "fitness tools"],
    openGraph: {
        title: "BMI Calculator | ToolNest",
        description: "Check your health status with our accurate BMI calculator.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
