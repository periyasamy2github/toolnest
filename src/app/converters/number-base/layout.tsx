import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Number Base Converter | ToolNest",
    description: "Convert numbers between Binary, Octal, Decimal, and Hexadecimal systems. Essential for computer science and programming.",
};

export default function NumberBaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
