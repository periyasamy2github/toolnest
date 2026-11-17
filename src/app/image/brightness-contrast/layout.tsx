import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/image/brightness-contrast");

export default function BrightnessContrastLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
