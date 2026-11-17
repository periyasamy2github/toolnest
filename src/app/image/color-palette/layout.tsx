import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/color-palette" },
    title: "Color Palette Generator - Create Beautiful Color Schemes",
    description: "Generate beautiful color palettes for your next project. Extract colors from images, explore trending schemes, and find perfect color combinations. 100% private.",
    keywords: ["color palette", "color scheme generator", "color picker", "hex color codes", "design tools", "WebToolNest", "color extractor"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Color Palette Generator",
        description: "Create stunning color schemes for your designs instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
