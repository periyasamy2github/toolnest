import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Watermark Tool - Add Text or Logo to Images | ToolNest",
    description: "Protect your images by adding custom text or logo watermarks. Adjust opacity, position, rotation, and tiling. Secure local processing.",
    keywords: ["watermark image", "add logo to photo", "copyright image", "watermark creator", "protect photos", "ToolNest", "free watermark tool"],
    openGraph: {
        title: "Free Online Watermark Tool | ToolNest",
        description: "Add custom text or logo watermarks to your images securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
