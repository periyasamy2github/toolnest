import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/text-to-binary");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
