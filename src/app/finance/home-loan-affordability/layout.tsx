import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/home-loan-affordability" },
    title: "Home Loan Affordability Calculator - Check Your Loan Eligibility",
    description: "Check your home loan eligibility based on your income and existing EMIs. Calculate the maximum loan amount you can afford. 100% private.",
    keywords: ["home loan eligibility", "loan affordability", "housing loan calculator", "mortgage calculator", "loan limit"],
};

export default function HomeLoanAffordabilityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
