import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Age Calculator - Calculate Your Exact Age Online | ToolNest",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find out how many days until your next birthday. 100% private.",
    keywords: ["age calculator", "calculate age", "birthday calculator", "how old am i", "ToolNest"],
};

export default function AgeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
