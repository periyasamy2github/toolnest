import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Grade Calculator - Calculate Your Final Grade and GPA | ToolNest",
    description: "Calculate your current grade and find out what you need on your final exam to reach your target grade. 100% private.",
    keywords: ["grade calculator", "final grade calculator", "gpa calculator", "academic tools", "ToolNest"],
};

export default function GradeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
