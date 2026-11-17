import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/xml-to-yaml");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
