import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Video Downloader - Save Videos from Any Site | ToolNest",
    description: "Download videos from various websites online for free. Support for multiple formats and qualities. Fast, secure, and easy to use. 100% private.",
    keywords: ["video downloader", "download video online", "save video free", "online video saver", "ToolNest", "utility tools"],
    openGraph: {
        title: "Online Video Downloader | ToolNest",
        description: "Download videos from any website instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
