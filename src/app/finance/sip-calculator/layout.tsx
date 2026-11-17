import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/sip-calculator" },
    title: "SIP Calculator - Systematic Investment Plan Returns Online",
    description: "Calculate returns on your Systematic Investment Plans (SIP) online for free. Estimate future wealth with expected annual returns and inflation adjustment. 100% private.",
    keywords: ["sip calculator", "mutual fund calculator", "investment calculator", "systematic investment plan", "wealth calculator"],
};

export default function SipLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
