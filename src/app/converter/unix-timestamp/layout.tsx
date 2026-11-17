import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/converter/unix-timestamp");

export default function ConverterLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
