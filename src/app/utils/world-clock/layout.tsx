import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/world-clock" },
    title: "World Clock - Current Time in Major Cities Online",
    description: "Check the current local time in major cities around the world. Easy-to-use world clock for travelers and global teams. 100% private.",
    keywords: ["world clock", "local time", "current time", "time zones", "WebToolNest", "utility tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "World Clock",
        description: "Check the current time in any city around the world.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
