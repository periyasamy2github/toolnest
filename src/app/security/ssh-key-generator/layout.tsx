import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/ssh-key-generator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
