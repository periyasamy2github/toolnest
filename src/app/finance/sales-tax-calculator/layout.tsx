import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/sales-tax-calculator" },
    title: "Sales Tax Calculator - Calculate Tax Inclusive and Exclusive Prices",
    description: "Calculate sales tax inclusive and exclusive prices online for free. Supports custom tax rates for any region. 100% private and secure.",
    keywords: ["sales tax calculator", "tax calculator", "sales tax inclusive", "sales tax exclusive", "WebToolNest"],
};

export default function SalesTaxCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
