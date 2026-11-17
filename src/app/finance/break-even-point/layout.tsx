import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/break-even-point" },
    title: "Break Even Point Calculator - Calculate Business Profitability",
    description: "Calculate the break-even point for your business. Determine the sales volume needed to cover all costs and start making a profit. 100% private.",
    keywords: ["break even point", "profitability calculator", "business tools", "financial planning", "WebToolNest"],
};

export default function BreakEvenPointLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
