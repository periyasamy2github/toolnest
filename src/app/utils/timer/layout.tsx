import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/timer" },
    title: "Online Timer - Set Countdown Alarms Online Free",
    description: "Set a countdown timer with alarm online for free. Simple, reliable, and easy to use. Perfect for cooking, studying, and workouts. 100% private.",
    keywords: ["online timer", "countdown timer", "timer with alarm", "utility tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Timer",
        description: "Set a countdown and stay on track with our free online timer.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
