import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Base64 Encoder & Decoder - Encode and Decode Base64 Online | ToolNest",
    description: "Encode and decode text or files to Base64 format. Fast, secure, and easy-to-use online Base64 converter for developers. 100% private.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter", "online base64", "developer tools", "ToolNest"],
    openGraph: {
        title: "Base64 Encoder & Decoder | ToolNest",
        description: "Encode and decode Base64 data instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
