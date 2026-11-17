import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/qr-code" },
    title: "Free QR Code Generator - Create Custom QR Codes Online",
    description: "Generate custom QR codes for URLs, text, Wi-Fi, and more. Fast, free, and no sign-up required. Create high-quality QR codes instantly. 100% private.",
    keywords: ["qr code generator", "create qr code", "free qr code", "custom qr code", "WebToolNest", "utility tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free QR Code Generator",
        description: "Create custom QR codes for free in seconds.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
