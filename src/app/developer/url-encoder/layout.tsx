import { Metadata } from "next";

export const metadata: Metadata = {
    title: "URL Encoder & Decoder - Encode and Decode URLs Online | ToolNest",
    description: "Encode and decode URLs online for free. Convert special characters to URL-safe format and vice versa. Fast, secure, and easy to use. 100% private.",
    keywords: ["url encoder", "url decoder", "percent encoding", "developer tools", "ToolNest"],
    openGraph: {
        title: "URL Encoder & Decoder | ToolNest",
        description: "Encode and decode URLs instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
