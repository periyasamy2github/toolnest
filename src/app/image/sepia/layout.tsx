import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/image/sepia");

export default function ImageSepiaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
