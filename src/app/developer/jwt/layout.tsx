import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/jwt" },
    title: "JWT Debugger - Decode, Verify, and Generate JSON Web Tokens",
    description: "Online JWT debugger to decode, verify, and generate JSON Web Tokens (JWT). Support for HS256 and other algorithms. Secure client-side processing. 100% private.",
    keywords: ["jwt debugger", "decode jwt", "verify jwt", "generate jwt", "json web token", "WebToolNest", "developer tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "JWT Debugger",
        description: "Decode and verify JSON Web Tokens instantly and securely.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
