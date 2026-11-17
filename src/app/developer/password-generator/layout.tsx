import { OG_IMAGE } from "@/lib/seo";
import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/developer/password-generator" },
    title: "Secure Password Generator - Create Strong Random Passwords",
    description: "Generate strong, secure, and random passwords instantly. Customize length, include symbols, numbers, and uppercase letters. 100% private and secure.",
    keywords: ["password generator", "secure password", "random password", "strong password", "WebToolNest", "security tools"],
    openGraph: {
        images: [OG_IMAGE],
        title: "Secure Password Generator",
        description: "Create strong and secure passwords to protect your accounts.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
