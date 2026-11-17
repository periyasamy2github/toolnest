import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/hmac-generator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
