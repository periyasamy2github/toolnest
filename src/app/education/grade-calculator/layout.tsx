import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/grade-calculator" },
    title: "Grade Calculator - Calculate Your Final Grade and GPA",
    description: "Calculate your current grade and find out what you need on your final exam to reach your target grade. 100% private.",
    keywords: ["grade calculator", "final grade calculator", "gpa calculator", "academic tools", "WebToolNest"],
};

export default function GradeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
