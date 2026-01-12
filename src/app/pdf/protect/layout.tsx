import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protect PDF - Password Protect PDF Online",
    description: "Encrypt your PDF files with a strong password. 100% private and secure browser-side encryption using standard PDF security.",
    keywords: ["protect pdf", "password protect pdf", "encrypt pdf", "pdf security", "free pdf tools"],
};

export default function ProtectLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
