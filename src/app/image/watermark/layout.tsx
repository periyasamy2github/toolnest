import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/watermark" },
    title: "Watermark Tool - Add Text or Logo to Images Online",
    description: "Protect your images by adding custom text or logo watermarks. Adjust opacity, position, rotation, and tiling. Secure local processing, 100% private.",
    keywords: ["watermark image", "add logo to photo", "copyright image", "watermark creator", "protect photos", "WebToolNest", "free watermark tool"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Watermark Tool",
        description: "Add custom text or logo watermarks to your images securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
