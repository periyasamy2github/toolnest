import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/savings-goal-calculator" },
    title: "Savings Goal Calculator - Plan Your Savings for Future Goals",
    description: "Calculate how much you need to save each month to reach your financial goals. Plan for a house, car, or vacation easily. 100% private.",
    keywords: ["savings goal calculator", "savings planner", "financial goals", "monthly savings", "WebToolNest"],
};

export default function SavingsGoalCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
