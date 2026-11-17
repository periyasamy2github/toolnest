import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/gpa-calculator" },
    title: "GPA Calculator - Calculate Your Grade Point Average",
    description: "Calculate your semester and cumulative GPA easily. Support for weighted and unweighted GPA calculations. 100% private and secure.",
    keywords: ["gpa calculator", "grade point average", "semester gpa", "cumulative gpa", "academic tools", "WebToolNest"],
};

export default function GPACalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
