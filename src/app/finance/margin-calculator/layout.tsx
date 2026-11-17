import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/margin-calculator" },
    title: "Margin Calculator - Calculate Profit Margin and Markup",
    description: "Calculate profit margin, markup, and gross profit for your products or services. Essential tool for business owners and freelancers. 100% private.",
    keywords: ["margin calculator", "profit margin", "markup calculator", "business tools", "WebToolNest"],
};

export default function MarginCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
