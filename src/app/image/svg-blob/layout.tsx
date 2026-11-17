import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/image/svg-blob");

export default function SvgBlobLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
