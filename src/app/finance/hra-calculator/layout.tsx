import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HRA Calculator - Calculate House Rent Allowance Exemption | ToolNest",
    description: "Calculate the tax-exempt portion of your House Rent Allowance (HRA) online for free. Optimize your tax savings with our easy-to-use tool. 100% private.",
    keywords: ["hra calculator", "house rent allowance", "tax exemption", "income tax saving", "ToolNest"],
};

export default function HRACalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
