import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/hsl-to-rgb");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
