import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/pomodoro" },
    title: "Online Pomodoro Timer - Boost Your Productivity Online",
    description: "Use the Pomodoro technique to improve your focus and productivity. Customizable work and break intervals. Simple, free, and 100% private.",
    keywords: ["pomodoro timer", "productivity tool", "focus timer", "pomodoro technique", "WebToolNest", "utility tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Pomodoro Timer",
        description: "Boost your productivity with our free Pomodoro timer.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
