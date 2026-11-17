import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/gradient-generator" },
    title: "CSS Gradient Generator - Create Beautiful Gradients Online",
    description: "Create stunning CSS gradients visually. Generate linear, radial, and conic gradients with color stops and copy the CSS code instantly. Free and private.",
    keywords: ["gradient generator", "css gradient", "linear gradient", "radial gradient", "gradient maker", "css gradient tool", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "CSS Gradient Generator",
        description: "Create stunning CSS gradients visually and copy the code instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
