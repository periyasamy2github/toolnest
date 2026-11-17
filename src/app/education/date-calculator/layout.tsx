import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/date-calculator" },
    title: "Date Calculator - Add or Subtract Days from a Date",
    description: "Calculate the duration between two dates or add/subtract days, weeks, months, and years from a specific date. 100% private.",
    keywords: ["date calculator", "duration between dates", "add days to date", "subtract days from date", "WebToolNest"],
};

export default function DateCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
