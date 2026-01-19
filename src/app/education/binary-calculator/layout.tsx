import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Binary Calculator - Perform Binary Arithmetic Online | ToolNest",
    description: "Perform addition, subtraction, multiplication, and division on binary numbers. Easy-to-use tool for computer science students. 100% private.",
    keywords: ["binary calculator", "binary arithmetic", "binary addition", "binary subtraction", "ToolNest"],
};

export default function BinaryCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
