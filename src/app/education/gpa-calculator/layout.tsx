import { Metadata } from "next";

export const metadata: Metadata = {
    title: "GPA Calculator - Calculate Your Grade Point Average | ToolNest",
    description: "Calculate your semester and cumulative GPA easily. Support for weighted and unweighted GPA calculations. 100% private and secure.",
    keywords: ["gpa calculator", "grade point average", "semester gpa", "cumulative gpa", "academic tools", "ToolNest"],
};

export default function GPACalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
