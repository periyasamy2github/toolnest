import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/youtube-title-generator");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
