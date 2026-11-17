import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/csv-to-xml");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
