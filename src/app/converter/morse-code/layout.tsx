import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/morse-code");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
