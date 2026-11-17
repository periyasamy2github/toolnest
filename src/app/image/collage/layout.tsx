import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/collage" },
    title: "Collage Maker - Create Photo Grids and Layouts Online",
    description: "Create beautiful photo collages with customizable layouts, borders, and backgrounds. Combine multiple images into a single photo instantly. 100% private.",
    keywords: ["collage maker", "photo grid", "combine photos", "picture layout", "online collage creator", "WebToolNest", "free photo joiner"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Collage Maker",
        description: "Create stunning photo collages and grids in seconds.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
