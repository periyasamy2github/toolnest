import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/html-entities" },
    title: "HTML Entities Encoder & Decoder - Encode and Decode HTML",
    description: "Encode and decode HTML entities online for free. Convert special characters to HTML entities and vice versa. Fast, secure, and easy to use. 100% private.",
    keywords: ["html entities", "encode html", "decode html", "html characters", "developer tools", "WebToolNest"],
    openGraph: {
        images: [OG_IMAGE],
        title: "HTML Entities Encoder/Decoder",
        description: "Encode and decode HTML entities instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
