import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gratuity Calculator - Calculate Your Gratuity Amount Online | ToolNest",
    description: "Calculate the gratuity amount you are eligible for after 5 years of service. Based on the Payment of Gratuity Act, 1972. 100% private.",
    keywords: ["gratuity calculator", "gratuity rules", "salary calculator", "employee benefits", "india gratuity"],
};

export default function GratuityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
