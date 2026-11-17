import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/nps-calculator" },
    title: "NPS Calculator - Calculate National Pension Scheme Returns",
    description: "Calculate your pension and lumpsum amount at retirement with the National Pension Scheme (NPS) calculator. Plan your retirement today. 100% private.",
    keywords: ["nps calculator", "national pension scheme", "retirement planning", "pension calculator", "WebToolNest"],
};

export default function NPSCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
