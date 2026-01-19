import { Metadata } from "next";

export const metadata: Metadata = {
    title: "RD Calculator - Recurring Deposit Maturity Calculator | ToolNest",
    description: "Calculate the maturity amount and interest earned on your Recurring Deposits (RD) online for free. Plan your savings effectively. 100% private.",
    keywords: ["rd calculator", "recurring deposit", "savings calculator", "interest calculator", "ToolNest"],
};

export default function RDCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
