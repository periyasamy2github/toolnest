import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/image/image-to-base64");

export default function ImageToBase64Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
