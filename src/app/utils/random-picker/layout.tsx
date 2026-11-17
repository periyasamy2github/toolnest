import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/random-picker" },
    title: "Online Random Picker - Pick Names, Numbers and More",
    description: "Pick a random item from a list, generate random numbers, or flip a coin. Fast, free, and easy-to-use online random picker. 100% private.",
    keywords: ["random picker", "random name picker", "random number generator", "decision maker", "WebToolNest", "utility tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Random Picker",
        description: "Make random selections easily with our free online picker.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
