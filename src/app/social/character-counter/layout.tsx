import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/character-counter");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
