import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Roman Numeral Converter - Convert Numbers to Roman Numerals | ToolNest",
    description: "Convert Arabic numbers to Roman numerals and vice versa online for free. Fast, accurate, and 100% private.",
    keywords: ["roman numeral converter", "arabic to roman", "roman to arabic", "ToolNest"],
};

export default function RomanNumeralLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
