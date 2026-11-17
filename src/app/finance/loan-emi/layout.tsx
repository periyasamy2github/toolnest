import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/loan-emi" },
    title: "Loan EMI Calculator - Calculate Monthly EMIs for Loans",
    description: "Free Loan EMI Calculator with amortization schedule. Calculate monthly EMI, total interest, and total payment for home, car, and personal loans. 100% private.",
    keywords: ["emi calculator", "loan calculator", "home loan emi", "car loan emi", "personal loan emi", "amortization schedule", "WebToolNest finance"],
};

export default function LoanEmiLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
