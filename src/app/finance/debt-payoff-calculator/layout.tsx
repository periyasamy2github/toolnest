import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Debt Payoff Calculator - Plan Your Debt-Free Journey | ToolNest",
    description: "Calculate how long it will take to pay off your debts. Plan your debt-free journey with our easy-to-use financial tool. 100% private.",
    keywords: ["debt payoff calculator", "debt free", "financial planning", "loan payoff", "ToolNest"],
};

export default function DebtPayoffCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
