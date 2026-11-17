import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/emoji-picker");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
