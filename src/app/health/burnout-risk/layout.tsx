import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Burnout Risk Assessment - Check Your Stress Levels Online | ToolNest",
    description: "Assess your risk of burnout with our simple and private online tool. Get insights into your mental well-being and stress levels. 100% private.",
    keywords: ["burnout risk", "stress assessment", "mental health tool", "workplace stress", "health tools", "ToolNest"],
    openGraph: {
        title: "Burnout Risk Assessment | ToolNest",
        description: "Check your burnout risk and prioritize your mental health.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
