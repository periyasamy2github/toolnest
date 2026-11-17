import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/compound-interest" },
    title: "Compound Interest Calculator - Visualize Wealth Growth Online",
    description: "Calculate compound interest with monthly, quarterly, or yearly compounding frequencies. Visualize how your money grows over time. 100% private.",
    keywords: ["compound interest calculator", "interest calculator", "wealth growth", "compounding", "investment calculator"],
};

export default function CompoundInterestLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
