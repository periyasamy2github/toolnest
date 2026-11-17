import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/cron-generator" },
    title: "Cron Job Generator - Create and Debug Cron Expressions",
    description: "Create and debug cron expressions visually. Generate schedules for minutes, hours, days, months, and weeks with human-readable descriptions. 100% private.",
    keywords: ["cron generator", "cron job editor", "cron expression", "schedule generator", "crontab helper", "WebToolNest", "developer tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Cron Job Generator",
        description: "Create and debug cron expressions visually with our free tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
