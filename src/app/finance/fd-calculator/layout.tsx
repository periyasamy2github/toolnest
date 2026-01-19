import { Metadata } from "next";

export const metadata: Metadata = {
    title: "FD Calculator - Fixed Deposit Maturity and Interest Calculator | ToolNest",
    description: "Calculate maturity amount and interest earned on Fixed Deposits (FD). Compare returns for different tenures and interest rates. 100% private.",
    keywords: ["fd calculator", "fixed deposit", "bank deposit", "interest calculator", "investment"],
};

export default function FdLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
