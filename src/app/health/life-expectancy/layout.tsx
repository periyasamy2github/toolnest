import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Life Expectancy Calculator - Estimate Your Lifespan Online | ToolNest",
    description: "Estimate your life expectancy based on your age, gender, and lifestyle factors. Get insights into your longevity and health. 100% private.",
    keywords: ["life expectancy calculator", "lifespan estimate", "longevity calculator", "health tools", "ToolNest"],
    openGraph: {
        title: "Life Expectancy Calculator | ToolNest",
        description: "Estimate your lifespan and get insights into your health.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
