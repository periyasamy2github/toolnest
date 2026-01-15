import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Salary Time Value Calculator - Inflation & Investment Projection | ToolNest",
    description: "Calculate the real value of your future salary adjusted for inflation. Project your wealth growth with investment potential and interactive lifetime earnings charts.",
    keywords: ["salary calculator", "time value of money", "inflation calculator", "investment projection", "wealth calculator", "salary hike projection"],
};

export default function SalaryTimeValueLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
