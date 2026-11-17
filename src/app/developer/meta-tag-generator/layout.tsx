import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/developer/meta-tag-generator");

export default function MetaTagGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
