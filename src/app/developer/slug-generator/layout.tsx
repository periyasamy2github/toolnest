import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/developer/slug-generator");

export default function SlugGeneratorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
