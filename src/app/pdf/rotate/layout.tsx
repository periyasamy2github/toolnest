import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Rotate PDF - Rotate PDF Pages Online",
    description: "Rotate your PDF pages permanently for free. Works in your browser, no file uploads required. Secure and private.",
    keywords: ["rotate pdf", "turn pdf", "flip pdf", "pdf rotator", "free pdf tools"],
};

export default function RotateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
