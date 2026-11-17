import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/lumpsum-calculator" },
    title: "Lumpsum Calculator - Calculate Returns on One-Time Investments",
    description: "Calculate the future value of your one-time (lumpsum) investments in mutual funds or stocks. Plan your wealth growth easily. 100% private.",
    keywords: ["lumpsum calculator", "investment returns", "mutual fund calculator", "wealth growth", "WebToolNest"],
};

export default function LumpsumCalculatorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
