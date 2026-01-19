import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Loan EMI Calculator - Calculate Monthly EMIs for Loans | ToolNest",
    description: "Free Loan EMI Calculator with amortization schedule. Calculate monthly EMI, total interest, and total payment for home, car, and personal loans. 100% private.",
    keywords: ["emi calculator", "loan calculator", "home loan emi", "car loan emi", "personal loan emi", "amortization schedule", "ToolNest finance"],
};

export default function LoanEmiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
