import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/text-encryptor");

export default function TextEncryptorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
