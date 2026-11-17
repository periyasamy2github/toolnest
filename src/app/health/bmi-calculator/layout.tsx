import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/bmi-calculator" },
    title: "BMI Calculator - Calculate Body Mass Index Online",
    description: "Calculate your Body Mass Index (BMI) easily. Supports Metric and Imperial units, with specific standards for Asian/Indian populations. 100% private.",
    keywords: ["bmi calculator", "body mass index", "calculate bmi", "health calculator", "weight status", "WebToolNest", "fitness tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "BMI Calculator",
        description: "Check your health status with our accurate BMI calculator.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
