import type { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/image/favicon-generator" },
    title: "Favicon Generator - Create Professional Favicons Online",
    description: "Create professional favicons from any image instantly. Generate all necessary sizes for your website. Fast, free, and 100% private.",
    keywords: ["favicon generator", "create favicon", "website icon maker", "generate favicon from image", "WebToolNest", "free favicon tool"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
