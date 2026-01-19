import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ROI Calculator - Calculate Return on Investment Online | ToolNest",
    description: "Calculate the Return on Investment (ROI) for any project or investment online for free. Measure profitability and efficiency easily. 100% private.",
    keywords: ["roi calculator", "return on investment", "profitability calculator", "investment analysis", "ToolNest"],
};

export default function ROICalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
