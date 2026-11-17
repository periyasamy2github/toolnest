import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/subnet-calculator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
