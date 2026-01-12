import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cron Job Generator - Visual Cron Expression Editor | ToolNest",
    description: "Create and debug cron expressions visually. Generate schedules for minutes, hours, days, months, and weeks. Human-readable descriptions included.",
    keywords: ["cron generator", "cron job editor", "cron expression", "schedule generator", "crontab helper", "ToolNest", "developer tools"],
    openGraph: {
        title: "Free Online Cron Job Generator | ToolNest",
        description: "Create and debug cron expressions visually with our free tool.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
