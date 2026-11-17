import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/youtube-description-generator");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
