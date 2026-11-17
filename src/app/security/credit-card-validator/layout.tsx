import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/credit-card-validator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
