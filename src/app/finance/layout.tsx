import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Business & Finance Tools - Financial Calculators & Productivity | ToolNest",
    description: "Comprehensive suite of financial calculators and productivity tools. Plan loans, investments, taxes, and retirement, or create invoices and track time. 100% free and private.",
    keywords: [
        "finance tools", "emi calculator", "sip calculator", "tax calculator",
        "investment calculator", "loan calculator", "retirement planner",
        "gst calculator", "ppf calculator", "financial planning",
        "invoice generator", "pomodoro timer"
    ],
};

export default function FinanceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
