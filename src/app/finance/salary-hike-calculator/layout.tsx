import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Salary Hike Calculator - Calculate Percentage Increase in Salary | ToolNest",
    description: "Calculate your salary hike percentage and new salary amount online for free. Perfect for appraisal discussions and job offers. 100% private.",
    keywords: ["salary hike calculator", "salary increase", "percentage increase", "appraisal tool", "ToolNest"],
};

export default function SalaryHikeCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
