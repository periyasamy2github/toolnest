import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free QR Code Generator - Create Custom QR Codes | ToolNest",
    description: "Generate custom QR codes for URLs, text, Wi-Fi, and more. Fast, free, and no sign-up required. Create high-quality QR codes instantly.",
    keywords: ["qr code generator", "create qr code", "free qr code", "custom qr code", "ToolNest", "utility tools"],
    openGraph: {
        title: "Free QR Code Generator | ToolNest",
        description: "Create custom QR codes for free in seconds.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
