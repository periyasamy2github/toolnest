import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/rgb-to-hex");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
