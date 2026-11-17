import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/swp-calculator" },
    title: "SWP Calculator - Systematic Withdrawal Plan Calculator",
    description: "Calculate your Systematic Withdrawal Plan (SWP) from mutual funds. See how long your investments will last with regular withdrawals. 100% private.",
    keywords: ["swp calculator", "systematic withdrawal plan", "mutual fund withdrawal", "retirement income", "WebToolNest"],
};

export default function SWPCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
