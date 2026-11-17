import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/health/smoking-cost" },
    title: "Smoking Cost Calculator - See How Much You Can Save Online",
    description: "Calculate the financial cost of smoking and see how much money you could save by quitting. 100% private and free online tool.",
    keywords: ["smoking cost calculator", "quit smoking savings", "cost of smoking", "health tools", "WebToolNest", "financial health"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Smoking Cost Calculator",
        description: "Calculate your smoking expenses and discover the benefits of quitting.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
