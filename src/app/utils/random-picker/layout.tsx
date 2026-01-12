import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Random Picker - Pick Names, Numbers & More | ToolNest",
    description: "Pick a random item from a list, generate random numbers, or flip a coin. Fast, free, and easy-to-use online random picker for any decision.",
    keywords: ["random picker", "random name picker", "random number generator", "decision maker", "ToolNest", "utility tools"],
    openGraph: {
        title: "Online Random Picker | ToolNest",
        description: "Make random selections easily with our free online picker.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
