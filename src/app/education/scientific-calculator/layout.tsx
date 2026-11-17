import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/scientific-calculator" },
    title: "Scientific Calculator - Advanced Math Calculations Online",
    description: "Perform advanced mathematical calculations including trigonometry, logarithms, and more. Free, powerful, and 100% private online calculator.",
    keywords: ["scientific calculator", "advanced calculator", "math tool", "trigonometry calculator", "WebToolNest"],
};

export default function ScientificCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
