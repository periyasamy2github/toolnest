import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/age-calculator" },
    title: "Age Calculator - Calculate Your Exact Age Online",
    description: "Calculate your exact age in years, months, days, hours, and minutes. Find out how many days until your next birthday. 100% private.",
    keywords: ["age calculator", "calculate age", "birthday calculator", "how old am i", "WebToolNest"],
};

export default function AgeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
