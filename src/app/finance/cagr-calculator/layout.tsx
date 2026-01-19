import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CAGR Calculator - Calculate Compound Annual Growth Rate | ToolNest",
    description: "Calculate the Compound Annual Growth Rate (CAGR) of your investments over time. Easy-to-use tool for financial analysis. 100% private.",
    keywords: ["cagr calculator", "compound annual growth rate", "investment analysis", "growth rate calculator", "ToolNest"],
};

export default function CAGRCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
