import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/file-checksum");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
