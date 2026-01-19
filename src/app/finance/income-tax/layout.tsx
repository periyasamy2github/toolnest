import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Income Tax Calculator - Compare Old vs New Tax Regime Online | ToolNest",
    description: "Calculate your income tax liability for FY 2024-25. Compare Old vs New Tax Regime to find which one saves you more tax. 100% private.",
    keywords: ["income tax calculator", "tax calculator", "old vs new regime", "tax saving", "income tax india"],
};

export default function IncomeTaxLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
