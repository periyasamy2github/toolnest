import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Simple Interest Calculator - Calculate Interest on Loans and Savings | ToolNest",
    description: "Calculate simple interest on your loans or savings online for free. Easy-to-use tool for quick financial calculations. 100% private.",
    keywords: ["simple interest calculator", "interest calculator", "loan interest", "savings interest", "ToolNest"],
};

export default function SimpleInterestCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
