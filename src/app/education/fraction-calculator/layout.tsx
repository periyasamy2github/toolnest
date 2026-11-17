import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/fraction-calculator" },
    title: "Fraction Calculator - Add, Subtract, Multiply and Divide Fractions",
    description: "Perform arithmetic operations on fractions and mixed numbers. Get simplified results and step-by-step calculations. 100% private.",
    keywords: ["fraction calculator", "calculate fractions", "math tool", "simplify fractions", "WebToolNest"],
};

export default function FractionCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
