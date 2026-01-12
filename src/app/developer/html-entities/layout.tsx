import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HTML Entities Encoder/Decoder - Online HTML Tool | ToolNest",
    description: "Encode and decode HTML entities online for free. Convert special characters to HTML entities and vice versa. Fast, secure, and easy to use.",
    keywords: ["html entities", "encode html", "decode html", "html characters", "developer tools", "ToolNest"],
    openGraph: {
        title: "HTML Entities Encoder/Decoder | ToolNest",
        description: "Encode and decode HTML entities instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
