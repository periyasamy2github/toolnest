import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Smoking Cost Calculator - See How Much You Can Save | ToolNest",
    description: "Calculate the financial cost of smoking and see how much money you could save by quitting. Get motivated to quit smoking with our free online tool.",
    keywords: ["smoking cost calculator", "quit smoking savings", "cost of smoking", "health tools", "ToolNest", "financial health"],
    openGraph: {
        title: "Smoking Cost Calculator | ToolNest",
        description: "Calculate your smoking expenses and discover the benefits of quitting.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
