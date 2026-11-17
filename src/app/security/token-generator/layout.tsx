import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/token-generator");

export default function TokenGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
