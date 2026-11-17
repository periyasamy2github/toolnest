import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/net-worth" },
    title: "Net Worth Tracker - Calculate Your Financial Health Online",
    description: "Track your total assets and liabilities to calculate your net worth. A simple tool to measure your financial progress. 100% private.",
    keywords: ["net worth calculator", "wealth tracker", "assets vs liabilities", "financial health", "personal finance"],
};

export default function NetWorthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
