import { Metadata } from "next";

export const metadata: Metadata = {
    title: "VAT Calculator - Calculate Value Added Tax Online | ToolNest",
    description: "Calculate VAT (Value Added Tax) inclusive and exclusive prices online for free. Supports custom VAT rates for any country. 100% private.",
    keywords: ["vat calculator", "tax calculator", "vat inclusive", "vat exclusive", "ToolNest"],
};

export default function VATCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
