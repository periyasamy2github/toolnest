import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/discount-calculator" },
    title: "Discount Calculator - Calculate Savings and Sale Prices Online",
    description: "Calculate the final price after discounts and see how much you save. Perfect for shopping and sales. Fast, free, and 100% private.",
    keywords: ["discount calculator", "sale price calculator", "savings calculator", "shopping tools", "WebToolNest"],
};

export default function DiscountCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
