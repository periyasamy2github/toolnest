import { toolMetadata } from "@/lib/seo";

export const metadata = toolMetadata("/security/password-strength");

export default function PasswordStrengthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
