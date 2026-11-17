import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/xml-to-csv");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
