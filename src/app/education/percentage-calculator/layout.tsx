import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/percentage-calculator" },
    title: "Percentage Calculator - Calculate Percentages Online",
    description: "Calculate percentage increases, decreases, and find what percentage one number is of another. Fast, free, and 100% private.",
    keywords: ["percentage calculator", "calculate percentage", "percentage increase", "percentage decrease", "WebToolNest"],
};

export default function PercentageCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
