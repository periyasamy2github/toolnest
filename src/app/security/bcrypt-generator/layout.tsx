import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/bcrypt-generator");

export default function SecurityLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
