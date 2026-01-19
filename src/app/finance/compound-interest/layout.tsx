import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Compound Interest Calculator - Visualize Wealth Growth Online | ToolNest",
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
