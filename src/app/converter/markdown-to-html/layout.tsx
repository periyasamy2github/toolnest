import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/markdown-to-html");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
