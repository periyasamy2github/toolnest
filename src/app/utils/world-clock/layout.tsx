import { Metadata } from "next";

export const metadata: Metadata = {
    title: "World Clock - Current Time in Major Cities | ToolNest",
    description: "Check the current local time in major cities around the world. Easy-to-use world clock for travelers and global teams.",
    keywords: ["world clock", "local time", "current time", "time zones", "ToolNest", "utility tools"],
    openGraph: {
        title: "World Clock | ToolNest",
        description: "Check the current time in any city around the world.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
