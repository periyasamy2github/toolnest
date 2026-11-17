import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/pixel-to-rem");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
