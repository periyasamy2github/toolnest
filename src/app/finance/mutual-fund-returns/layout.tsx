import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mutual Fund Returns Calculator - Calculate Investment Growth | ToolNest",
    description: "Calculate the returns on your mutual fund investments online for free. See how your wealth grows over time with our easy-to-use tool. 100% private.",
    keywords: ["mutual fund returns", "investment calculator", "wealth growth", "financial planning", "ToolNest"],
};

export default function MutualFundReturnsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
