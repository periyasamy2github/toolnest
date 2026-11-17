import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/binary-calculator" },
    title: "Binary Calculator - Perform Binary Arithmetic Online",
    description: "Perform addition, subtraction, multiplication, and division on binary numbers. Easy-to-use tool for computer science students. 100% private.",
    keywords: ["binary calculator", "binary arithmetic", "binary addition", "binary subtraction", "WebToolNest"],
};

export default function BinaryCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
