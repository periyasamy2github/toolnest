import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/debt-payoff-calculator" },
    title: "Debt Payoff Calculator - Plan Your Debt-Free Journey",
    description: "Calculate how long it will take to pay off your debts. Plan your debt-free journey with our easy-to-use financial tool. 100% private.",
    keywords: ["debt payoff calculator", "debt free", "financial planning", "loan payoff", "WebToolNest"],
};

export default function DebtPayoffCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
