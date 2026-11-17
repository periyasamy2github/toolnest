import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/url-encoder" },
    title: "URL Encoder & Decoder - Encode and Decode URLs Online",
    description: "Encode and decode URLs online for free. Convert special characters to URL-safe format and vice versa. Fast, secure, and easy to use. 100% private.",
    keywords: ["url encoder", "url decoder", "percent encoding", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "URL Encoder & Decoder",
        description: "Encode and decode URLs instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
