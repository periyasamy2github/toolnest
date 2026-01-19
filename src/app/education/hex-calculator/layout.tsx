import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Hex Calculator - Perform Hexadecimal Arithmetic Online | ToolNest",
    description: "Perform addition, subtraction, multiplication, and division on hexadecimal numbers. Essential tool for developers and students. 100% private.",
    keywords: ["hex calculator", "hexadecimal arithmetic", "hex addition", "hex subtraction", "ToolNest"],
};

export default function HexCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
