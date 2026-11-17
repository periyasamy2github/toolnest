import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/finance/retirement-planner" },
    title: "Retirement Planner - Calculate Retirement Corpus Online",
    description: "Plan your retirement with our advanced calculator. Estimate the corpus needed to maintain your lifestyle post-retirement considering inflation. 100% private.",
    keywords: ["retirement planner", "retirement calculator", "pension planner", "financial freedom", "fire calculator"],
};

export default function RetirementLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
