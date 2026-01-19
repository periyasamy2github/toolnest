import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Retirement Planner - Calculate Retirement Corpus Online | ToolNest",
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
