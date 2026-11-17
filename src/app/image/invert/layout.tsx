import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/image/invert");

export default function ImageInvertLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
