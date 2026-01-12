import { Metadata } from "next";

export const metadata: Metadata = {
    title: "CSS Gradient Generator - Create Beautiful Gradients | ToolNest",
    description: "Create stunning CSS gradients visually. Linear, radial, and conic gradients with color stops. Copy CSS code instantly. Free and private.",
    keywords: ["gradient generator", "css gradient", "linear gradient", "radial gradient", "gradient maker", "css gradient tool", "ToolNest"],
    openGraph: {
        title: "CSS Gradient Generator | ToolNest",
        description: "Create stunning CSS gradients visually and copy the code instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
