import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Color Palette Generator - Create Beautiful Color Schemes | ToolNest",
    description: "Generate beautiful color palettes for your next project. Extract colors from images, explore trending schemes, and find perfect color combinations.",
    keywords: ["color palette", "color scheme generator", "color picker", "hex color codes", "design tools", "ToolNest", "color extractor"],
    openGraph: {
        title: "Color Palette Generator | ToolNest",
        description: "Create stunning color schemes for your designs instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
