import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/facebook-post-generator");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
