import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/aspect-ratio");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
