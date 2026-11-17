import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/life-expectancy" },
    title: "Life Expectancy Calculator - Estimate Your Lifespan Online",
    description: "Estimate your life expectancy based on your age, gender, and lifestyle factors. Get insights into your longevity and health. 100% private.",
    keywords: ["life expectancy calculator", "lifespan estimate", "longevity calculator", "health tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Life Expectancy Calculator",
        description: "Estimate your lifespan and get insights into your health.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
