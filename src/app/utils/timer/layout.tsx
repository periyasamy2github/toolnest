import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Timer - Set Countdown Alarms Free | ToolNest",
    description: "Set a countdown timer with alarm online for free. Simple, reliable, and easy to use. Perfect for cooking, studying, and workouts.",
    keywords: ["online timer", "countdown timer", "timer with alarm", "utility tools", "ToolNest"],
    openGraph: {
        title: "Online Timer | ToolNest",
        description: "Set a countdown and stay on track with our free online timer.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
