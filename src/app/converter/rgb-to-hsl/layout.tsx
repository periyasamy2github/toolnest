import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/rgb-to-hsl");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
