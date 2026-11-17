import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/rd-calculator" },
    title: "RD Calculator - Recurring Deposit Maturity Calculator",
    description: "Calculate the maturity amount and interest earned on your Recurring Deposits (RD) online for free. Plan your savings effectively. 100% private.",
    keywords: ["rd calculator", "recurring deposit", "savings calculator", "interest calculator", "WebToolNest"],
};

export default function RDCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
