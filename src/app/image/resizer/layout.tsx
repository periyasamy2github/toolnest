import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Online Image Resizer - Resize Images to Any Dimension Online | ToolNest",
    description: "Resize JPG, PNG, and WebP images online for free. Change image dimensions by pixels or percentage while maintaining quality. 100% private and secure.",
    keywords: ["image resizer", "resize image online", "change image dimensions", "crop image", "ToolNest", "image tools"],
    openGraph: {
        title: "Online Image Resizer | ToolNest",
        description: "Resize your images to any dimension quickly and easily.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
