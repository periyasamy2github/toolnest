import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Signature Generator - Create Digital Signatures Online | ToolNest",
    description: "Create professional digital signatures online. Draw your signature, customize colors and thickness, and download as PNG or JPG. 100% private and secure.",
    keywords: ["signature generator", "digital signature", "online signature", "electronic signature", "draw signature", "ToolNest", "free signature maker"],
    openGraph: {
        title: "Free Online Signature Generator | ToolNest",
        description: "Create and download your digital signature instantly.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
