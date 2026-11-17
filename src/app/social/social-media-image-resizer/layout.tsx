import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/social-media-image-resizer");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
