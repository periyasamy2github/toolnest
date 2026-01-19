import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Favicon Generator - Create Professional Favicons Online | ToolNest",
    description: "Create professional favicons from any image instantly. Generate all necessary sizes for your website. Fast, free, and 100% private.",
    keywords: ["favicon generator", "create favicon", "website icon maker", "generate favicon from image", "ToolNest", "free favicon tool"],
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
