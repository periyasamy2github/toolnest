import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/utils/signature-generator" },
    title: "Signature Generator - Create Digital Signatures Online",
    description: "Create professional digital signatures online. Draw your signature, customize colors and thickness, and download as PNG or JPG. 100% private and secure.",
    keywords: ["signature generator", "digital signature", "online signature", "electronic signature", "draw signature", "WebToolNest", "free signature maker"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Free Online Signature Generator",
        description: "Create and download your digital signature instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
