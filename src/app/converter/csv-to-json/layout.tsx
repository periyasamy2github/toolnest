import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/csv-to-json");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
