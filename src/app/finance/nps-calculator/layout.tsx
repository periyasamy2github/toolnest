import { Metadata } from "next";

export const metadata: Metadata = {
    title: "NPS Calculator - Calculate National Pension Scheme Returns | ToolNest",
    description: "Calculate your pension and lumpsum amount at retirement with the National Pension Scheme (NPS) calculator. Plan your retirement today. 100% private.",
    keywords: ["nps calculator", "national pension scheme", "retirement planning", "pension calculator", "ToolNest"],
};

export default function NPSCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
