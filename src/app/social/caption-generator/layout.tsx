import { Metadata } from "next";

export const metadata: Metadata = {
    alternates: { canonical: "/social/caption-generator" },
    title: "Caption Generator",
    description: "Generate engaging captions for your Instagram, Facebook, and LinkedIn posts.",
    keywords: ["caption generator", "instagram captions", "social media captions", "photo captions", "content writing"]
};

export default function CaptionGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
