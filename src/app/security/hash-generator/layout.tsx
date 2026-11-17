import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/hash-generator");

export default function HashGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
