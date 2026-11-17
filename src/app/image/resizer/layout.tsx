import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/resizer" },
    title: "Online Image Resizer - Resize Images to Any Dimension Online",
    description: "Resize JPG, PNG, and WebP images online for free. Change image dimensions by pixels or percentage while maintaining quality. 100% private and secure.",
    keywords: ["image resizer", "resize image online", "change image dimensions", "crop image", "WebToolNest", "image tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Online Image Resizer",
        description: "Resize your images to any dimension quickly and easily.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
