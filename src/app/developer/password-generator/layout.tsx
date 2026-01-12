import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Secure Password Generator - Create Strong Random Passwords | ToolNest",
    description: "Generate strong, secure, and random passwords instantly. Customize length, include symbols, numbers, and uppercase letters. 100% private and secure.",
    keywords: ["password generator", "secure password", "random password", "strong password", "ToolNest", "security tools"],
    openGraph: {
        title: "Secure Password Generator | ToolNest",
        description: "Create strong and secure passwords to protect your accounts.",
        type: "website",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
