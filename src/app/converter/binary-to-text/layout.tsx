import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/binary-to-text");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
