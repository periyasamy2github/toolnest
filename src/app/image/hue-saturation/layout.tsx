import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/image/hue-saturation");

export default function HueSaturationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
