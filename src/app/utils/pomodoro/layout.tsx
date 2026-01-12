import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Pomodoro Timer - Boost Your Productivity | ToolNest",
    description: "Use the Pomodoro technique to improve your focus and productivity. Customizable work and break intervals. Simple, free, and effective.",
    keywords: ["pomodoro timer", "productivity tool", "focus timer", "pomodoro technique", "ToolNest", "utility tools"],
    openGraph: {
        title: "Online Pomodoro Timer | ToolNest",
        description: "Boost your productivity with our free Pomodoro timer.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
