import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/hashtag-counter");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
