import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PPF Calculator - Public Provident Fund Returns Online | ToolNest",
    description: "Calculate maturity amount and interest for Public Provident Fund (PPF) accounts. Plan your long-term tax-saving investments. 100% private.",
    keywords: ["ppf calculator", "public provident fund", "tax saving", "investment", "retirement planning"],
};

export default function PpfLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
