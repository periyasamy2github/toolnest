import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Statistics Calculator - Calculate Mean, Median, Mode and More | ToolNest",
    description: "Calculate statistical measures like mean, median, mode, standard deviation, and variance online for free. 100% private and accurate.",
    keywords: ["statistics calculator", "calculate mean", "standard deviation calculator", "math tool", "ToolNest"],
};

export default function StatisticsCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
