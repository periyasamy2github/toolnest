import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/hra-calculator" },
    title: "HRA Calculator - Calculate House Rent Allowance Exemption",
    description: "Calculate the tax-exempt portion of your House Rent Allowance (HRA) online for free. Optimize your tax savings with our easy-to-use tool. 100% private.",
    keywords: ["hra calculator", "house rent allowance", "tax exemption", "income tax saving", "WebToolNest"],
};

export default function HRACalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
