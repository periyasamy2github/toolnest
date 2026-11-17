import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/social/engagement-rate-calculator");

export default function SocialMediaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
