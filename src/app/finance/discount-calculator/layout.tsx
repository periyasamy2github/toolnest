import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Discount Calculator - Calculate Savings and Sale Prices Online | ToolNest",
    description: "Calculate the final price after discounts and see how much you save. Perfect for shopping and sales. Fast, free, and 100% private.",
    keywords: ["discount calculator", "sale price calculator", "savings calculator", "shopping tools", "ToolNest"],
};

export default function DiscountCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
