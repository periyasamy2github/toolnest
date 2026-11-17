import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/random-user-generator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
