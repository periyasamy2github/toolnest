import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SWP Calculator - Systematic Withdrawal Plan Calculator | ToolNest",
    description: "Calculate your Systematic Withdrawal Plan (SWP) from mutual funds. See how long your investments will last with regular withdrawals. 100% private.",
    keywords: ["swp calculator", "systematic withdrawal plan", "mutual fund withdrawal", "retirement income", "ToolNest"],
};

export default function SWPCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
