import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/education/roman-numeral" },
    title: "Roman Numeral Converter - Convert Numbers to Roman Numerals",
    description: "Convert Arabic numbers to Roman numerals and vice versa online for free. Fast, accurate, and 100% private.",
    keywords: ["roman numeral converter", "arabic to roman", "roman to arabic", "WebToolNest"],
};

export default function RomanNumeralLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
