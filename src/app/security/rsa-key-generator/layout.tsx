import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/rsa-key-generator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
