import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/cagr-calculator" },
    title: "CAGR Calculator - Calculate Compound Annual Growth Rate",
    description: "Calculate the Compound Annual Growth Rate (CAGR) of your investments over time. Easy-to-use tool for financial analysis. 100% private.",
    keywords: ["cagr calculator", "compound annual growth rate", "investment analysis", "growth rate calculator", "WebToolNest"],
};

export default function CAGRCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
