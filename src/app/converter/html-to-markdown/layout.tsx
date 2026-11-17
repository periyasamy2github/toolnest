import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/html-to-markdown");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
