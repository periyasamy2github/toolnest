import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/salary-time-value" },
    title: "Salary Time Value Calculator - Inflation and Investment Projection",
    description: "Calculate the real value of your future salary adjusted for inflation. Project your wealth growth with investment potential. 100% private.",
    keywords: ["salary calculator", "time value of money", "inflation calculator", "investment projection", "wealth calculator", "salary hike projection"],
};

export default function SalaryTimeValueLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
