import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/pdf/unlock" },
    title: "Unlock PDF - Remove Password from PDF Online",
    description: "Remove passwords and restrictions from your PDF files easily. 100% private and secure browser-based tool.",
    keywords: ["unlock pdf", "remove pdf password", "pdf password remover", "decrypt pdf", "free pdf tools"],
};

export default function UnlockLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
