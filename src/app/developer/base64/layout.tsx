import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/base64" },
    title: "Base64 Encoder & Decoder - Encode and Decode Base64 Online",
    description: "Encode and decode text or files to Base64 format. Fast, secure, and easy-to-use online Base64 converter for developers. 100% private.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "online base64", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Base64 Encoder & Decoder",
        description: "Encode and decode Base64 data instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
