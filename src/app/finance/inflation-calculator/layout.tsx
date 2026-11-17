import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/inflation-calculator" },
    title: "Inflation Calculator - Calculate Purchasing Power Over Time",
    description: "Calculate how inflation affects the value of your money over time. See the purchasing power of your savings in the future. 100% private.",
    keywords: ["inflation calculator", "purchasing power", "money value", "financial planning", "WebToolNest"],
};

export default function InflationCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
