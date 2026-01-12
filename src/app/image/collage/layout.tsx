import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collage Maker - Create Photo Grids Online | ToolNest",
    description: "Create beautiful photo collages with customizable layouts, borders, and backgrounds. Combine multiple images into a single photo instantly.",
    keywords: ["collage maker", "photo grid", "combine photos", "picture layout", "online collage creator", "ToolNest", "free photo joiner"],
    openGraph: {
        title: "Free Online Collage Maker | ToolNest",
        description: "Create stunning photo collages and grids in seconds.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
